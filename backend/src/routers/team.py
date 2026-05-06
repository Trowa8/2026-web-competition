from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.team import (
    AppointCaptainRequest,
    TeamCodeResponse,
    TeamCreateRequest,
    TeamCreateResponse,
    TeamDetailResponse,
    TeamJoinRequest,
    TeamSummaryResponse,
    TeamUpdateRequest,
)
from src.services.team import (
    appoint_captain_service,
    create_team_service,
    delete_team_service,
    get_team_code_service,
    get_team_service,
    enroll_in_team_service,
    list_teams_service,
    remove_member_service,
    update_team_service,
)
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/teams", tags=["teams"])

@router.get("", response_model=list[TeamSummaryResponse])
async def list_teams(
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await list_teams_service(db)

@router.post("", response_model=TeamCreateResponse, status_code=201)
async def create_team(
    data: TeamCreateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await create_team_service(db, data, current_user_id)

@router.get("/{team_id}", response_model=TeamDetailResponse)
async def get_team(
    team_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_team_service(db, team_id)

@router.put("/{team_id}", response_model=TeamDetailResponse)
async def update_team(
    team_id: str,
    data: TeamUpdateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await update_team_service(db, team_id, data, current_user_id)

@router.delete("/{team_id}")
async def delete_team(
    team_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await delete_team_service(db, team_id, current_user_id)
    return {"success": True}

@router.get("/{team_id}/code", response_model=TeamCodeResponse)
async def get_team_code(
    team_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_team_code_service(db, team_id, current_user_id)

@router.post("/{team_id}/join")
async def enroll_in_team(
    team_id: str,
    data: TeamJoinRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await enroll_in_team_service(db, team_id, data, current_user_id)
    return {"success": True}

@router.delete("/{team_id}/members/{user_id}")
async def remove_member(
    team_id: str,
    user_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await remove_member_service(db, team_id, user_id, current_user_id)
    return {"success": True}

@router.post("/{team_id}/appoint-captain")
async def appoint_captain(
    team_id: str,
    data: AppointCaptainRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    await appoint_captain_service(db, team_id, data, current_user_id)
    return {"success": True}