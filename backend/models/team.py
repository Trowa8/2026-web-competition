from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid, utcnow


class Team(Base):
    __tablename__ = "teams"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utcnow)
    join_code: Mapped[str] = mapped_column(String(6), nullable=False, unique=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    members: Mapped[List["User"]] = relationship(back_populates="team", foreign_keys="User.team_id")
    tournament_participations: Mapped[List["TournamentParticipation"]] = relationship(back_populates="team")
    solutions: Mapped[List["Solution"]] = relationship(back_populates="team")
    # leaderboard_entries: Mapped[List["Leaderboard"]] = relationship(back_populates="team")