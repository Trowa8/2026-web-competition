from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.solution import Solution


async def get_solutions_by_task(db: AsyncSession, task_id: str) -> list[Solution]:
    result = await db.execute(select(Solution).where(Solution.task_id == task_id))
    return result.scalars().all()

async def get_solution_by_task_and_team(db: AsyncSession, task_id: str, team_id: str) -> Solution | None:
    result = await db.execute(
        select(Solution).where(Solution.task_id == task_id, Solution.team_id == team_id)
    )
    return result.scalar_one_or_none()

async def get_solution_by_id(db: AsyncSession, solution_id: str) -> Solution | None:
    result = await db.execute(select(Solution).where(Solution.id == solution_id))
    return result.scalar_one_or_none()

async def create_solution(db: AsyncSession, solution: Solution) -> Solution:
    db.add(solution)
    await db.commit()
    return solution