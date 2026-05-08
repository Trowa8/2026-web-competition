from typing import Annotated
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.tournament import (
    TournamentCreateRequest,
    TournamentCreateResponse,
    TournamentDeleteResponse,
    TournamentDetailResponse,
    TournamentSummaryResponse,
    TournamentUpdateRequest,
    RegisterTeamRequest, 
    RegisterTeamResponse,
)
from src.services.tournament import (
    create_tournament_service,
    delete_tournament_service,
    get_tournament_service,
    list_tournaments_service,
    update_tournament_service,
    register_team_service,
    get_judge_code_service,
    join_as_judge_service,
)
from src.utils.jwt import get_current_user_id
 
router = APIRouter(prefix="/tournaments", tags=["tournaments"])

@router.post("", response_model=TournamentCreateResponse, status_code=201)
async def create_tournament(
    data: TournamentCreateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await create_tournament_service(db, data, current_user_id)

@router.get("", response_model=list[TournamentSummaryResponse])
async def list_tournaments(
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await list_tournaments_service(db)

@router.get("/{tournament_id}", response_model=TournamentDetailResponse)
async def get_tournament(
    tournament_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_tournament_service(db, tournament_id)

@router.put("/{tournament_id}", response_model=TournamentDetailResponse)
async def update_tournament(
    tournament_id: str,
    data: TournamentUpdateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await update_tournament_service(db, tournament_id, data, current_user_id)

@router.delete("/{tournament_id}", response_model=TournamentDeleteResponse)
async def delete_tournament(
    tournament_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await delete_tournament_service(db, tournament_id, current_user_id)

@router.post("/{tournament_id}/register", response_model=RegisterTeamResponse)
async def register_team(
    tournament_id: str,
    data: RegisterTeamRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await register_team_service(db, tournament_id, data, current_user_id)

class JudgeCodeRequest(BaseModel):
    judge_code: str

@router.get("/{tournament_id}/judge-code")
async def get_judge_code(
    tournament_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_judge_code_service(db, tournament_id, current_user_id)

@router.post("/{tournament_id}/join-judge")
async def join_as_judge(
    tournament_id: str,
    data: JudgeCodeRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await join_as_judge_service(db, tournament_id, data.judge_code, current_user_id)
    return {"success": True}