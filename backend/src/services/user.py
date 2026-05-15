from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.crud.user import delete_user, get_user_by_email, get_user_by_id, get_user_by_username, update_user
from src.schemas.user import UserDeleteResponse, UserResponse, UserUpdateRequest, UserUpdateResponse
from src.utils.jwt import get_password_hash

def _require_self(current_user_id: str, user_id: str) -> None:
    if current_user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

async def get_me(db: AsyncSession, current_user_id: str) -> UserResponse:
    user = await get_user_by_id(db, current_user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return UserResponse(
        user_id=user.id,
        login=user.username,
        email=user.email,
        created_at=user.joined_at,
    )

async def get_user(db: AsyncSession, user_id: str, current_user_id: str) -> UserResponse:
    _require_self(current_user_id, user_id)

    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return UserResponse(
        user_id=user.id,
        login=user.username,
        email=user.email,
        created_at=user.joined_at,
    )

async def update_user_service(
    db: AsyncSession, user_id: str, data: UserUpdateRequest, current_user_id: str
) -> UserUpdateResponse:
    _require_self(current_user_id, user_id)

    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if data.login is not None:
        existing = await get_user_by_username(db, data.login)
        if existing and existing.id != user_id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already in use")

    if data.email is not None:
        existing = await get_user_by_email(db, data.email)
        if existing and existing.id != user_id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")

    hashed_password = get_password_hash(data.password) if data.password is not None else None
    user = await update_user(db, user, data.login, data.email, hashed_password)

    return UserUpdateResponse(
        user_id=user.id,
        login=user.username,
        email=user.email,
        updated_at=datetime.now(timezone.utc),
    )

async def delete_user_service(
    db: AsyncSession, user_id: str, current_user_id: str
) -> UserDeleteResponse:
    _require_self(current_user_id, user_id)

    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    await delete_user(db, user)
    return UserDeleteResponse(success=True)