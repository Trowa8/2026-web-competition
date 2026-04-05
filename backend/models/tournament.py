from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Tournament(Base):
    __tablename__ = "tournaments"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    registration_deadline: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    created_by: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    creator: Mapped["User"] = relationship(foreign_keys=[created_by])
    team_tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="tournament")
    tasks: Mapped[List["Task"]] = relationship(back_populates="tournament")
    leaderboard: Mapped[List["Leaderboard"]] = relationship(back_populates="tournament")