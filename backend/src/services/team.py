from aiomysql import IntegrityError
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.team import Team
from src.crud.team import (
    add_member,
    appoint_captain,
    create_team,
    delete_team,
    get_all_teams,
    get_captain,
    get_max_join_code,
    get_team_by_id,
    get_team_by_name,
    get_team_members,
    get_team_member_counts,
    remove_member,
    update_team,
)
from src.crud.user import get_user_by_id
from src.schemas.team import (
    AppointCaptainRequest,
    TeamCodeResponse,
    TeamCreateRequest,
    TeamCreateResponse,
    TeamDetailResponse,
    TeamJoinRequest,
    TeamMemberResponse,
    TeamSummaryResponse,
    TeamUpdateRequest,
)

async def _get_team_or_404(db: AsyncSession, team_id: str) -> Team:
    team = await get_team_by_id(db, team_id)
    if not team:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")
    return team

async def _require_captain(db: AsyncSession, team_id: str, user_id: str) -> None:
    captain = await get_captain(db, team_id)
    if not captain or captain.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the captain can perform this action")

def _next_join_code(max_code: str | None) -> str:
    return str(int(max_code) + 1).zfill(6) if max_code else "000001"


async def list_teams_service(db: AsyncSession) -> list[TeamSummaryResponse]:
    teams = await get_all_teams(db)
    counts = await get_team_member_counts(db)
    return [
        TeamSummaryResponse(team_id=t.id, name=t.name, member_count=counts.get(t.id, 0))
        for t in teams
    ]

async def create_team_service(
    db: AsyncSession, data: TeamCreateRequest, current_user_id: str
) -> TeamCreateResponse:
    user = await get_user_by_id(db, current_user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    if user.team_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already belongs to a team")
    if await get_team_by_name(db, data.name):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Team name already in use")

    for _ in range(5):
        max_code = await get_max_join_code(db)
        team = Team(name=data.name, description=data.description, join_code=_next_join_code(max_code))
        try:
            await create_team(db, team, user)
            break
        except IntegrityError:
            await db.rollback()
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not generate a unique team code")

    return TeamCreateResponse(
        team_id=team.id,
        name=team.name,
        description=team.description,
        captain_id=current_user_id,
        created_at=team.created_at,
    )

async def get_team_service(db: AsyncSession, team_id: str) -> TeamDetailResponse:
    team = await _get_team_or_404(db, team_id)
    members = await get_team_members(db, team_id)
    captain = await get_captain(db, team_id)
    return TeamDetailResponse(
        team_id=team.id,
        name=team.name,
        captain_id=captain.id if captain else None,
        members=[
            TeamMemberResponse(user_id=m.id, role="captain" if m.is_captain else "member")
            for m in members
        ],
        created_at=team.created_at,
    )

async def update_team_service(
    db: AsyncSession, team_id: str, data: TeamUpdateRequest, current_user_id: str
) -> TeamDetailResponse:
    team = await _get_team_or_404(db, team_id)
    await _require_captain(db, team_id, current_user_id)
    await update_team(db, team, data.name, data.description)
    return await get_team_service(db, team_id)

async def delete_team_service(
    db: AsyncSession, team_id: str, current_user_id: str
) -> None:
    team = await _get_team_or_404(db, team_id)
    await _require_captain(db, team_id, current_user_id)
    await delete_team(db, team)

async def get_team_code_service(
    db: AsyncSession, team_id: str, current_user_id: str
) -> TeamCodeResponse:
    team = await _get_team_or_404(db, team_id)
    await _require_captain(db, team_id, current_user_id)
    return TeamCodeResponse(team_code=team.join_code)

async def enroll_in_team_service(
    db: AsyncSession, team_id: str, data: TeamJoinRequest, current_user_id: str
) -> None:
    team = await _get_team_or_404(db, team_id)
    user = await get_user_by_id(db, current_user_id)
    if user.team_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already belongs to a team")
    if team.join_code != data.team_code:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid team code")
    await add_member(db, user, team_id)

async def remove_member_service(
    db: AsyncSession, team_id: str, user_id: str, current_user_id: str
) -> None:
    await _get_team_or_404(db, team_id)
    await _require_captain(db, team_id, current_user_id)
    user = await get_user_by_id(db, user_id)
    if not user or user.team_id != team_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found in this team")
    if user.is_captain:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot remove the captain")
    await remove_member(db, user)

async def appoint_captain_service(
    db: AsyncSession, team_id: str, data: AppointCaptainRequest, current_user_id: str
) -> None:
    await _get_team_or_404(db, team_id)
    await _require_captain(db, team_id, current_user_id)
    old_captain = await get_captain(db, team_id)
    new_captain = await get_user_by_id(db, data.user_id)
    if not new_captain or new_captain.team_id != team_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found in this team")
    await appoint_captain(db, old_captain, new_captain)