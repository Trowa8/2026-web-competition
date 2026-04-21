from datetime import datetime
from typing import List
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid, utcnow


class Team(Base):
    __tablename__ = "teams"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utcnow)

    members: Mapped[List["User"]] = relationship(back_populates="team", foreign_keys="User.team_id")
    team_tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="team")
    solutions: Mapped[List["Solution"]] = relationship(back_populates="team")
    leaderboard_entries: Mapped[List["Leaderboard"]] = relationship(back_populates="team")