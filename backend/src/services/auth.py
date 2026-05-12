import hmac
from datetime import timedelta

import jwt
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import settings
from src.crud.user import create_user
from src.crud.auth import (
    get_user_by_email,
    get_user_by_id,
    get_user_by_username_or_email,
    update_refresh_token,
)
from src.schemas.auth import RefreshRequest, SignUpRequest, SignInRequest, TokenResponse
from src.utils.jwt import (
    DUMMY_HASH,
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
    hash_token,
)

_invalid_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

_invalid_token_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid or expired token",
    headers={"WWW-Authenticate": "Bearer"},
)


def _make_token_pair(user_id: str) -> tuple[str, str]:
    access_token = create_access_token(
        data={"sub": user_id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_refresh_token(
        data={"sub": user_id},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    return access_token, refresh_token


async def register(db: AsyncSession, data: SignUpRequest) -> TokenResponse:
    if await get_user_by_username_or_email(db, data.login, data.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username or email already in use")

    user = await create_user(db, data.login, data.email, get_password_hash(data.password))
    access_token, refresh_token = _make_token_pair(user.id)
    await update_refresh_token(db, user, hash_token(refresh_token))

    return TokenResponse(access_token=access_token, refresh_token=refresh_token, user_id=user.id)

async def login(db: AsyncSession, data: SignInRequest) -> TokenResponse:
    user = await get_user_by_email(db, data.email)
    if not user:
        verify_password(data.password, DUMMY_HASH)
        raise _invalid_credentials_exception
    if not verify_password(data.password, user.password):
        raise _invalid_credentials_exception

    access_token, refresh_token = _make_token_pair(user.id)
    await update_refresh_token(db, user, hash_token(refresh_token))

    return TokenResponse(access_token=access_token, refresh_token=refresh_token, user_id=user.id)

async def refresh(db: AsyncSession, data: RefreshRequest) -> TokenResponse:
    try:
        payload = jwt.decode(data.refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "refresh":
            raise _invalid_token_exception
    except InvalidTokenError:
        raise _invalid_token_exception

    user = await get_user_by_id(db, user_id)
    if user is None:
        raise _invalid_token_exception
    stored_hash: str | None = user.refresh_token
    if not stored_hash or not hmac.compare_digest(stored_hash, hash_token(data.refresh_token)):
        raise _invalid_token_exception

    access_token, new_refresh_token = _make_token_pair(user.id)
    await update_refresh_token(db, user, hash_token(new_refresh_token))

    return TokenResponse(access_token=access_token, refresh_token=new_refresh_token, user_id=user.id)