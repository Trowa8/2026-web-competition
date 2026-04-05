from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[Optional[str]] = mapped_column(String, ForeignKey("teams.id"), nullable=True)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    team: Mapped[Optional["Team"]] = relationship(back_populates="members", foreign_keys=[team_id])
    user_teams: Mapped[List["UserTeam"]] = relationship(back_populates="user")