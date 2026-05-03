from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.task import Task

async def get_tasks_by_tournament(db: AsyncSession, tournament_id: str) -> list[Task]:
    result = await db.execute(select(Task).where(Task.tournament_id == tournament_id))
    return result.scalars().all()

async def get_task_by_id(db: AsyncSession, task_id: str) -> Task | None:
    result = await db.execute(select(Task).where(Task.id == task_id))
    return result.scalar_one_or_none()

async def create_task(db: AsyncSession, task: Task) -> Task:
    db.add(task)
    await db.commit()
    return task

async def update_task(
    db: AsyncSession,
    task: Task,
    title: str | None,
    description: str | None,
    deadline,
    submission_start,
) -> Task:
    if title is not None:
        task.title = title
    if description is not None:
        task.description = description
    if deadline is not None:
        task.deadline = deadline
    if submission_start is not None:
        task.submission_start = submission_start
    await db.commit()
    return task

async def delete_task(db: AsyncSession, task: Task) -> None:
    db.delete(task)
    await db.commit()