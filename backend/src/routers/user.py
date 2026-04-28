from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.user import UserResponse
from src.services.user import get_user
from src.utils.jwt import get_current_user_id

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_endpoint(
    user_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    return await get_user(db, user_id, current_user_id)