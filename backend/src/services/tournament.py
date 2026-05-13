from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.tournament import Tournament
from models.tournament_user_role import TournamentUserRole
from models.tournament_participation import TournamentParticipation

from src.crud.tournament import (
    create_tournament,
    delete_tournament,
    get_all_tournaments,
    get_organizer_role,
    get_tournament_by_id,
    get_participation,
    register_team,
    get_max_judge_code,
    create_judge_role,
    get_existing_judge_role,
    get_max_judge_code,
    get_participations_by_tournament,
    get_task_scores_for_team,
)
from src.crud.user import get_user_by_id
from src.schemas.results import LeaderboardEntryResponse, TaskScoreResponse
from src.schemas.tournament import (
    TournamentCreateRequest,
    TournamentCreateResponse,
    TournamentDeleteResponse,
    TournamentDetailResponse,
    TournamentSummaryResponse,
    TournamentUpdateRequest,
    RegisterTeamRequest,
    RegisterTeamResponse,
)
from src.crud.team import (
    get_team_by_id,
    get_team_members,
    get_captain_by_team,
)


async def _get_tournament_or_404(db: AsyncSession, tournament_id: str) -> Tournament:
    tournament = await get_tournament_by_id(db, tournament_id)
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    return tournament

async def _require_organizer(db: AsyncSession, tournament_id: str, user_id: str) -> None:
    role = await get_organizer_role(db, tournament_id, user_id)
    if not role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only organizers can perform this action")

def _next_judge_code(max_code: str | None) -> str:
    return str(int(max_code) + 1).zfill(6) if max_code else "000001"

async def create_tournament_service(
    db: AsyncSession, data: TournamentCreateRequest, current_user_id: str
) -> TournamentCreateResponse:
    user = await get_user_by_id(db, current_user_id)
    max_code = await get_max_judge_code(db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    tournament = Tournament(
        name=data.name,
        description=data.description,
        start_date=data.start_date,
        end_date=data.end_date,
        registration_deadline=data.registration_deadline,
        created_by=current_user_id,
        judge_code=_next_judge_code(max_code),
    )
    organizer_role = TournamentUserRole(
        user_id=current_user_id,
        role="organizer",
        user_name=user.username,
    )
    await create_tournament(db, tournament, organizer_role)

    return TournamentCreateResponse(
        id=tournament.id,
        name=tournament.name,
        description=tournament.description,
        start_date=tournament.start_date,
        end_date=tournament.end_date,
        registration_deadline=tournament.registration_deadline,
        created_by=tournament.created_by,
        created_at=tournament.created_at,
    )

async def list_tournaments_service(db: AsyncSession) -> list[TournamentSummaryResponse]:
    tournaments = await get_all_tournaments(db)
    return [
        TournamentSummaryResponse(
            id=t.id,
            name=t.name,
            start_date=t.start_date,
            registration_deadline=t.registration_deadline,
        )
        for t in tournaments
    ]

async def get_tournament_service(db: AsyncSession, tournament_id: str) -> TournamentDetailResponse:
    tournament = await _get_tournament_or_404(db, tournament_id)
    return TournamentDetailResponse(
        id=tournament.id,
        name=tournament.name,
        description=tournament.description,
        start_date=tournament.start_date,
        end_date=tournament.end_date,
        registration_deadline=tournament.registration_deadline,
        created_by=tournament.created_by,
        created_at=tournament.created_at,
    )

async def update_tournament_service(
    db: AsyncSession, tournament_id: str, data: TournamentUpdateRequest, current_user_id: str
) -> TournamentDetailResponse:
    tournament = await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)

    if data.name is not None:
        tournament.name = data.name
    if data.description is not None:
        tournament.description = data.description
    if data.start_date is not None:
        tournament.start_date = data.start_date
    if data.end_date is not None:
        tournament.end_date = data.end_date
    if data.registration_deadline is not None:
        tournament.registration_deadline = data.registration_deadline

    await db.commit()

    return TournamentDetailResponse(
        id=tournament.id,
        name=tournament.name,
        description=tournament.description,
        start_date=tournament.start_date,
        end_date=tournament.end_date,
        registration_deadline=tournament.registration_deadline,
        created_by=tournament.created_by,
        created_at=tournament.created_at,
    )

async def delete_tournament_service(
    db: AsyncSession, tournament_id: str, current_user_id: str
) -> TournamentDeleteResponse:
    tournament = await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)
    await delete_tournament(db, tournament)
    return TournamentDeleteResponse(success=True)

async def register_team_service(
    db: AsyncSession, tournament_id: str, data: RegisterTeamRequest, current_user_id: str
) -> RegisterTeamResponse:
    await _get_tournament_or_404(db, tournament_id)

    team = await get_team_by_id(db, data.team_id)
    if not team:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")

    captain = await get_captain_by_team(db, data.team_id, current_user_id)
    if not captain:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the team captain can register")

    if await get_participation(db, tournament_id, data.team_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Team already registered")

    members = await get_team_members(db, data.team_id)
    participation = TournamentParticipation(
        team_id=data.team_id,
        tournament_id=tournament_id,
        team_name=team.name,
    )
    roles = [
        TournamentUserRole(
            user_id=m.id,
            tournament_id=tournament_id,
            role="participant",
            user_name=m.username,
        )
        for m in members
    ]
    await register_team(db, participation, roles)
    return RegisterTeamResponse(success=True)

async def get_judge_code_service(
    db: AsyncSession, tournament_id: str, current_user_id: str
) -> dict:
    tournament = await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)
    return {"judge_code": tournament.judge_code}

async def join_as_judge_service(
    db: AsyncSession, tournament_id: str, judge_code: str, current_user_id: str
) -> None:
    tournament = await _get_tournament_or_404(db, tournament_id)

    if tournament.judge_code != judge_code:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid judge code")

    if await get_existing_judge_role(db, tournament_id, current_user_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already has a role in this tournament")

    user = await get_user_by_id(db, current_user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    role = TournamentUserRole(
        user_id=current_user_id,
        tournament_id=tournament_id,
        role="judge",
        user_name=user.username,
    )
    await create_judge_role(db, role)
    
async def get_leaderboard_service(
    db: AsyncSession, tournament_id: str
) -> list[LeaderboardEntryResponse]:
    await _get_tournament_or_404(db, tournament_id)
    participations = await get_participations_by_tournament(db, tournament_id)

    leaderboard = []
    for p in participations:
        task_scores_raw = await get_task_scores_for_team(db, tournament_id, p.team_id)
        leaderboard.append(LeaderboardEntryResponse(
            rank=p.place,
            team_id=p.team_id,
            team_name=p.team_name,
            task_scores=[TaskScoreResponse(task_id=task_id, score=score) for task_id, score in task_scores_raw],
            total=p.total_score or 0,
        ))

    return leaderboard