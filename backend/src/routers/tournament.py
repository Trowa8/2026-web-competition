from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.tournament import (
    TournamentCreateRequest,
    TournamentCreateResponse,
    TournamentDeleteResponse,
    TournamentDetailResponse,
    TournamentSummaryResponse,
    TournamentUpdateRequest,
)
from src.services.tournament import (
    create_tournament_service,
    delete_tournament_service,
    get_tournament_service,
    list_tournaments_service,
    update_tournament_service,
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