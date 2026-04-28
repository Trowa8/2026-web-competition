from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.crud.user import get_user_by_id
from src.schemas.user import UserResponse


async def get_user(db: AsyncSession, user_id: str, current_user_id: str) -> UserResponse:
    if current_user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return UserResponse(
        user_id=user.id,
        login=user.username,
        email=user.email,
        created_at=user.joined_at,
    )