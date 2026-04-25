from datetime import timedelta
from typing import Annotated
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm

from src.database import get_db
from models.user import User
from src.config import settings
from src.schemas.auth import RefreshRequest, SignUpRequest, SignUpResponse, TokenResponse
from src.utils.jwt import (
    DUMMY_HASH,
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"},
)

async def _get_user_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()

async def authenticate_user(db: AsyncSession, username: str, password: str) -> User | None:
    user = await _get_user_by_username(db, username)
    if not user:
        verify_password(password, DUMMY_HASH)
        return None
    if not verify_password(password, user.password):
        return None
    return user

@router.post("/register", response_model=SignUpResponse, status_code=status.HTTP_201_CREATED)
async def register(
    data: SignUpRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    existing = await db.execute(
        select(User).where((User.username == data.login) | (User.email == data.email))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username or email already in use")

    user = User(username=data.login, email=data.email, password=get_password_hash(data.password))
    db.add(user)
    await db.flush()

    user_id = user.id

    access_token = create_access_token(
        data={"sub": user_id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_refresh_token(
        data={"sub": user_id},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )

    user.refresh_token = refresh_token
    await db.commit()

    return SignUpResponse(access_token=access_token, refresh_token=refresh_token, user_id=user_id)

@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise credentials_exception

    user_id = user.id

    access_token = create_access_token(
        data={"sub": user_id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_refresh_token(
        data={"sub": user_id},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )

    user.refresh_token = refresh_token
    await db.commit()

    return TokenResponse(access_token=access_token, refresh_token=refresh_token, user_id=user_id)

@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    data: RefreshRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    try:
        payload = jwt.decode(data.refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "refresh":
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
 
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
 
    if not user or user.refresh_token != data.refresh_token:
        raise credentials_exception
 
    new_access_token = create_access_token(
        data={"sub": user_id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    new_refresh_token = create_refresh_token(
        data={"sub": user_id},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
 
    user.refresh_token = new_refresh_token
    await db.commit()
 
    return TokenResponse(access_token=new_access_token, refresh_token=new_refresh_token, user_id=user_id)