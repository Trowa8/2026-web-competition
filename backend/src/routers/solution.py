from typing import Annotated
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.solution import (
    SolutionCreateRequest,
    SolutionCreateResponse,
    SolutionDetailResponse,
    SolutionSummaryResponse,
    SolutionUploadResponse,
)
from src.services.solution import (
    create_solution_service,
    get_solution_service,
    list_solutions_service,
    upload_file_service,
)
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/solutions", tags=["solutions"])

@router.post("/upload", response_model=SolutionUploadResponse)
async def upload_solution_file(
    task_id: str,
    team_id: str,
    file: Annotated[UploadFile, File()],
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await upload_file_service(task_id, team_id, file, current_user_id, db)

@router.post("", response_model=SolutionCreateResponse, status_code=201)
async def create_solution(
    data: SolutionCreateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await create_solution_service(db, data, current_user_id)

@router.get("/{task_id}", response_model=list[SolutionSummaryResponse])
async def list_solutions(
    task_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await list_solutions_service(db, task_id)

@router.get("/{task_id}/{team_id}", response_model=SolutionDetailResponse)
async def get_solution(
    task_id: str,
    team_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_solution_service(db, task_id, team_id)