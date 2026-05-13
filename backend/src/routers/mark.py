from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.judging import MarkResponse, SubmitScoreRequest, UpdateScoreRequest
from src.services.mark import list_marks_service, submit_score_service, update_score_service
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/marks", tags=["marks"])

@router.post("/{solution_id}", response_model=MarkResponse, status_code=201)
async def submit_score(
    solution_id: str,
    data: SubmitScoreRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await submit_score_service(db, solution_id, data, current_user_id)

@router.get("/{solution_id}", response_model=list[MarkResponse])
async def list_marks(
    solution_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await list_marks_service(db, solution_id, current_user_id)

@router.put("/{solution_id}/{mark_id}", response_model=MarkResponse)
async def update_score(
    solution_id: str,
    mark_id: str,
    data: UpdateScoreRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await update_score_service(db, solution_id, mark_id, data, current_user_id)