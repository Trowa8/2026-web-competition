from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.tournament import Tournament
from models.tournament_user_role import TournamentUserRole
from models.tournament_participation import TournamentParticipation

async def get_tournament_by_id(db: AsyncSession, tournament_id: str) -> Tournament | None:
    result = await db.execute(select(Tournament).where(Tournament.id == tournament_id))
    return result.scalar_one_or_none()

async def get_organizer_role(db: AsyncSession, tournament_id: str, user_id: str) -> TournamentUserRole | None:
    result = await db.execute(
        select(TournamentUserRole).where(
            TournamentUserRole.tournament_id == tournament_id,
            TournamentUserRole.user_id == user_id,
            TournamentUserRole.role == "organizer",
        )
    )
    return result.scalar_one_or_none()

async def get_all_tournaments(db: AsyncSession) -> list[Tournament]:
    result = await db.execute(select(Tournament))
    return result.scalars().all()

async def create_tournament(db: AsyncSession, tournament: Tournament, organizer_role: TournamentUserRole) -> Tournament:
    db.add(tournament)
    await db.flush()
    organizer_role.tournament_id = tournament.id
    db.add(organizer_role)
    await db.commit()
    return tournament

async def delete_tournament(db: AsyncSession, tournament: Tournament) -> None:
    await db.delete(tournament)
    await db.commit()
    
async def get_participation(db: AsyncSession, tournament_id: str, team_id: str) -> TournamentParticipation | None:
    result = await db.execute(
        select(TournamentParticipation).where(
            TournamentParticipation.tournament_id == tournament_id,
            TournamentParticipation.team_id == team_id,
        )
    )
    return result.scalar_one_or_none()

async def register_team(db: AsyncSession, participation: TournamentParticipation, roles: list[TournamentUserRole]) -> None:
    db.add(participation)   
    await db.flush()
    for role in roles:
        role.tournament_participation_id = participation.id
        db.add(role)
    await db.commit()