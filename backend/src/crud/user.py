from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User

async def get_user_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def get_user_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

async def update_user(
    db: AsyncSession,
    user: User,
    username: str | None,
    email: str | None,
    hashed_password: str | None,
) -> User:
    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    if hashed_password is not None:
        user.password = hashed_password
    await db.commit()
    return user

async def delete_user(db: AsyncSession, user: User) -> None:
    await db.delete(user)
    await db.commit()