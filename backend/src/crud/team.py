from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from models.team import Team
from models.user import User

async def get_all_teams(db: AsyncSession) -> list[Team]:
    result = await db.execute(select(Team))
    return result.scalars().all()

async def get_team_by_id(db: AsyncSession, team_id: str) -> Team | None:
    result = await db.execute(select(Team).where(Team.id == team_id))
    return result.scalar_one_or_none()

async def get_team_by_join_code(db: AsyncSession, code: str) -> Team | None:
    result = await db.execute(select(Team).where(Team.join_code == code))
    return result.scalar_one_or_none()

async def get_max_join_code(db: AsyncSession) -> str | None:
    result = await db.execute(select(func.max(Team.join_code)))
    return result.scalar_one_or_none()

async def get_team_members(db: AsyncSession, team_id: str) -> list[User]:
    result = await db.execute(select(User).where(User.team_id == team_id))
    return result.scalars().all()

async def get_captain(db: AsyncSession, team_id: str) -> User | None:
    result = await db.execute(
        select(User).where(User.team_id == team_id, User.is_captain.is_(True))
    )
    return result.scalar_one_or_none()

async def get_captain_by_team(db: AsyncSession, team_id: str, user_id: str) -> User | None:
    result = await db.execute(
        select(User).where(User.team_id == team_id, User.id == user_id, User.is_captain.is_(True))
    )
    return result.scalar_one_or_none()

async def create_team(db: AsyncSession, team: Team, captain: User) -> Team:
    db.add(team)
    await db.flush()
    captain.team_id = team.id
    captain.is_captain = True
    await db.commit()
    return team

async def update_team(db: AsyncSession, team: Team, name: str | None, description: str | None) -> Team:
    if name is not None:
        team.name = name
    if description is not None:
        team.description = description
    await db.commit()
    return team

async def delete_team(db: AsyncSession, team: Team) -> None:
    members = await get_team_members(db, team.id)
    for member in members:
        member.team_id = None
        member.is_captain = False
    await db.delete(team)
    await db.commit()

async def add_member(db: AsyncSession, user: User, team_id: str) -> None:
    user.team_id = team_id
    await db.commit()

async def remove_member(db: AsyncSession, user: User) -> None:
    user.team_id = None
    await db.commit()

async def appoint_captain(db: AsyncSession, old_captain: User, new_captain: User) -> None:
    old_captain.is_captain = False
    new_captain.is_captain = True
    await db.commit()
    
async def get_team_member_counts(db: AsyncSession) -> dict[str, int]:
    result = await db.execute(
        select(User.team_id, func.count(User.id))
        .where(User.team_id.isnot(None))
        .group_by(User.team_id)
    )
    return {row[0]: row[1] for row in result.all()}

async def get_team_by_name(db: AsyncSession, name: str) -> Team | None:
    result = await db.execute(select(Team).where(Team.name == name))
    return result.scalar_one_or_none()