from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.user import UserDeleteResponse, UserResponse, UserUpdateRequest, UserUpdateResponse
from src.services.user import delete_user_service, get_me, get_user, update_user_service
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/me", response_model=UserResponse)
async def get_me_endpoint(
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_me(db, current_user_id)

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_endpoint(
    user_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_user(db, user_id, current_user_id)

@router.put("/{user_id}", response_model=UserUpdateResponse)
async def update_user_endpoint(
    user_id: str,
    data: UserUpdateRequest,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await update_user_service(db, user_id, data, current_user_id)

@router.delete("/{user_id}", response_model=UserDeleteResponse)
async def delete_user_endpoint(
    user_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await delete_user_service(db, user_id, current_user_id)