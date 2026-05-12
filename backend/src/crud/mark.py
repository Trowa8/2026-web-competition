from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.mark import Mark
from models.tournament_user_role import TournamentUserRole

async def get_marks_by_solution(db: AsyncSession, solution_id: str) -> list[Mark]:
    result = await db.execute(select(Mark).where(Mark.solution_id == solution_id))
    return result.scalars().all()

async def get_mark_by_id(db: AsyncSession, mark_id: str) -> Mark | None:
    result = await db.execute(select(Mark).where(Mark.id == mark_id))
    return result.scalar_one_or_none()

async def get_mark_by_solution_and_judge(db: AsyncSession, solution_id: str, judge_role_id: str) -> Mark | None:
    result = await db.execute(
        select(Mark).where(Mark.solution_id == solution_id, Mark.judge_id == judge_role_id)
    )
    return result.scalar_one_or_none()

async def get_judge_role(db: AsyncSession, tournament_id: str, user_id: str) -> TournamentUserRole | None:
    result = await db.execute(
        select(TournamentUserRole).where(
            TournamentUserRole.tournament_id == tournament_id,
            TournamentUserRole.user_id == user_id,
            TournamentUserRole.role == "judge",
        )
    )
    return result.scalar_one_or_none()

async def get_tournament_role(db: AsyncSession, tournament_id: str, user_id: str) -> TournamentUserRole | None:
    result = await db.execute(
        select(TournamentUserRole).where(
            TournamentUserRole.tournament_id == tournament_id,
            TournamentUserRole.user_id == user_id,
        )
    )
    return result.scalar_one_or_none()

async def create_mark(db: AsyncSession, mark: Mark) -> Mark:
    db.add(mark)
    await db.commit()
    return mark

async def update_mark(db: AsyncSession, mark: Mark, score: int | None, comment: str | None) -> Mark:
    if score is not None:
        mark.score = score
    if comment is not None:
        mark.comment = comment
    await db.commit()
    return mark