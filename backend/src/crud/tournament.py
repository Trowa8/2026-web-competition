from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from models.tournament import Tournament
from models.tournament_user_role import TournamentUserRole
from models.tournament_participation import TournamentParticipation
from models.solution import Solution
from models.task import Task
from models.mark import Mark

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
    
async def get_max_judge_code(db: AsyncSession) -> str | None:
    result = await db.execute(select(func.max(Tournament.judge_code)))
    return result.scalar_one_or_none()

async def get_existing_judge_role(db: AsyncSession, tournament_id: str, user_id: str) -> TournamentUserRole | None:
    result = await db.execute(
        select(TournamentUserRole).where(
            TournamentUserRole.tournament_id == tournament_id,
            TournamentUserRole.user_id == user_id,
            TournamentUserRole.role == "judge",
        )
    )
    return result.scalar_one_or_none()

async def create_judge_role(db: AsyncSession, role: TournamentUserRole) -> None:
    db.add(role)
    await db.commit()   
    
async def get_participations_by_tournament(db: AsyncSession, tournament_id: str) -> list[TournamentParticipation]:
    result = await db.execute(
        select(TournamentParticipation).where(TournamentParticipation.tournament_id == tournament_id)
    )
    return result.scalars().all()

async def get_all_task_scores_for_tournament(db: AsyncSession, tournament_id: str) -> list[tuple[str, str, int]]:
    result = await db.execute(
        select(Solution.team_id, Solution.task_id, func.sum(Mark.score))
        .join(Mark, Mark.solution_id == Solution.id)
        .join(Task, Task.id == Solution.task_id)
        .where(Task.tournament_id == tournament_id)
        .group_by(Solution.team_id, Solution.task_id)
    )
    return result.all()

async def get_participation_by_team(db: AsyncSession, tournament_id: str, team_id: str) -> TournamentParticipation | None:
    result = await db.execute(
        select(TournamentParticipation).where(
            TournamentParticipation.tournament_id == tournament_id,
            TournamentParticipation.team_id == team_id,
        )
    )
    return result.scalar_one_or_none()

async def update_total_score(db: AsyncSession, participation: TournamentParticipation, total: int) -> None:
    participation.total_score = total
    await db.commit()