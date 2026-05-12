from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.task import Task
from src.crud.task import (
    create_task, 
    delete_task, 
    get_task_by_id, 
    get_tasks_by_tournament, 
    update_task,
)
from src.crud.tournament import get_organizer_role, get_tournament_by_id
from src.schemas.task import (
    TaskCreateRequest,
    TaskCreateResponse,
    TaskDetailResponse,
    TaskSummaryResponse,
    TaskUpdateRequest,
)

async def _get_tournament_or_404(db, tournament_id):
    tournament = await get_tournament_by_id(db, tournament_id)
    if not tournament:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tournament not found")
    return tournament

async def _get_task_or_404(db, task_id, tournament_id):
    task = await get_task_by_id(db, task_id, tournament_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

async def _require_organizer(db, tournament_id, user_id):
    role = await get_organizer_role(db, tournament_id, user_id)
    if not role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only organizers can perform this action")

def _is_open(task: Task) -> bool:
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    return task.submission_start <= now <= task.deadline


async def list_tasks_service(
    db: AsyncSession, tournament_id: str
) -> list[TaskSummaryResponse]:
    await _get_tournament_or_404(db, tournament_id)
    tasks = await get_tasks_by_tournament(db, tournament_id)
    return [
        TaskSummaryResponse(
            task_id=t.id,
            title=t.title,
            deadline=t.deadline,
            is_open=_is_open(t),
        )
        for t in tasks
    ]

async def get_task_service(
    db: AsyncSession, tournament_id: str, task_id: str
) -> TaskDetailResponse:
    await _get_tournament_or_404(db, tournament_id)
    task = await _get_task_or_404(db, task_id, tournament_id)
    return TaskDetailResponse(
        task_id=task.id,
        title=task.title,
        description=task.description,
        deadline=task.deadline,
        submission_start=task.submission_start,
    )

async def create_task_service(
    db: AsyncSession, tournament_id: str, data: TaskCreateRequest, current_user_id: str
) -> TaskCreateResponse:
    await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)

    task = Task(
        title=data.title,
        description=data.description,
        deadline=data.deadline,
        submission_start=data.submission_start,
        tournament_id=tournament_id,
    )
    await create_task(db, task)

    return TaskCreateResponse(
        task_id=task.id,
        title=task.title,
        description=task.description,
        deadline=task.deadline,
        submission_start=task.submission_start,
        tournament_id=tournament_id,
    )

async def update_task_service(
    db: AsyncSession, tournament_id: str, task_id: str, data: TaskUpdateRequest, current_user_id: str
) -> TaskDetailResponse:
    await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)
    task = await _get_task_or_404(db, task_id, tournament_id)

    await update_task(db, task, data.title, data.description, data.deadline, data.submission_start)

    return TaskDetailResponse(
        task_id=task.id,
        title=task.title,
        description=task.description,
        deadline=task.deadline,
        submission_start=task.submission_start,
    )

async def delete_task_service(
    db: AsyncSession, tournament_id: str, task_id: str, current_user_id: str
) -> None:
    await _get_tournament_or_404(db, tournament_id)
    await _require_organizer(db, tournament_id, current_user_id)
    task = await _get_task_or_404(db, task_id, tournament_id)
    await delete_task(db, task)