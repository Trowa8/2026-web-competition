from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.tournament import Tournament
from models.tournament_user_role import TournamentUserRole
from src.crud.tournament import (
    create_tournament,
    delete_tournament,
    get_all_tournaments,
    get_organizer_role,
    get_tournament_by_id,
)
from src.crud.user import get_user_by_id
from src.schemas.tournament import (
    TournamentCreateRequest,
    TournamentCreateResponse,
    TournamentDeleteResponse,
    TournamentDetailResponse,
    TournamentSummaryResponse,
    TournamentUpdateRequest,
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

async def create_tournament_service(
    db: AsyncSession, data: TournamentCreateRequest, current_user_id: str
) -> TournamentCreateResponse:
    user = await get_user_by_id(db, current_user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    tournament = Tournament(
        name=data.name,
        description=data.description,
        start_date=data.start_date,
        end_date=data.end_date,
        registration_deadline=data.registration_deadline,
        created_by=current_user_id,
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