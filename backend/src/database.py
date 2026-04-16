from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from src.config import settings

engine = create_async_engine(settings.DATABASE_URL,echo=True,pool_pre_ping=True,)

AsyncSessionLocal = async_sessionmaker(engine,class_=AsyncSession,)

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise