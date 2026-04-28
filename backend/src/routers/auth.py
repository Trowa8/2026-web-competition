from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from src.schemas.auth import RefreshRequest, SignInRequest, SignUpRequest, TokenResponse
from src.services.auth import login, refresh, register

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=TokenResponse, status_code=201)
async def register_endpoint(
    data: SignUpRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await register(db, data)

@router.post("/login", response_model=TokenResponse)
async def login_endpoint(
    data: SignInRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await login(db, data)

@router.post("/refresh", response_model=TokenResponse)
async def refresh_endpoint(
    data: RefreshRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await refresh(db, data)