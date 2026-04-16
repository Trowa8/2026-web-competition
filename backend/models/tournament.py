from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, Text, ForeignKey, Integer, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid, utcnow


class Tournament(Base):
    __tablename__ = "tournaments"

    __table_args__ = (
        CheckConstraint("max_teams > 0", name="ck_tournament_max_teams_positive"),
        CheckConstraint("status IN ('draft', 'registration', 'active', 'finished', 'cancelled')", name="ck_tournament_status"),)

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    registration_deadline: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    max_teams: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="draft")
    created_by: Mapped[str] = mapped_column(String(32), ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)

    creator: Mapped["User"] = relationship(foreign_keys=[created_by])
    team_tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="tournament")
    tasks: Mapped[List["Task"]] = relationship(back_populates="tournament")
    leaderboard: Mapped[List["Leaderboard"]] = relationship(back_populates="tournament")
    user_roles: Mapped[List["TournamentUserRole"]] = relationship(back_populates="tournament")