from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

async def get_user_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def get_user_by_username_or_email(db: AsyncSession, username: str, email: str) -> User | None:
    result = await db.execute(
        select(User).where((User.username == username) | (User.email == email))
    )
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, username: str, email: str, hashed_password: str) -> User:
    user = User(username=username, email=email, password=hashed_password)
    db.add(user)
    await db.flush()
    return user

async def update_refresh_token(db: AsyncSession, user: User, refresh_token: str) -> None:
    user.refresh_token = refresh_token
    await db.commit()