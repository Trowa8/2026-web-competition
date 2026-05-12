from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.task import (
    TaskCreateRequest,
    TaskCreateResponse,
    TaskDetailResponse,
    TaskSummaryResponse,
    TaskUpdateRequest,
)
from src.services.task import (
    create_task_service,
    delete_task_service,
    get_task_service,
    list_tasks_service,
    update_task_service,
)
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/tournaments/{tournament_id}/tasks", tags=["tasks"])

@router.get("", response_model=list[TaskSummaryResponse])
async def list_tasks(
    tournament_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await list_tasks_service(db, tournament_id)

@router.post("", response_model=TaskCreateResponse, status_code=201)
async def create_task(
    tournament_id: str,
    data: TaskCreateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await create_task_service(db, tournament_id, data, current_user_id)

@router.get("/{task_id}", response_model=TaskDetailResponse)
async def get_task(
    tournament_id: str,
    task_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_task_service(db, tournament_id, task_id)

@router.put("/{task_id}", response_model=TaskDetailResponse)
async def update_task(
    tournament_id: str,
    task_id: str,
    data: TaskUpdateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await update_task_service(db, tournament_id, task_id, data, current_user_id)

@router.delete("/{task_id}")
async def delete_task(
    tournament_id: str,
    task_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await delete_task_service(db, tournament_id, task_id, current_user_id)
    return {"success": True}