from datetime import datetime
from typing import List
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Team(Base):
    __tablename__ = "teams"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    captain_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    captain: Mapped["User"] = relationship(foreign_keys=[captain_id])
    members: Mapped[List["User"]] = relationship(back_populates="team", foreign_keys="User.team_id")
    user_teams: Mapped[List["UserTeam"]] = relationship(back_populates="team")
    team_tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="team")
    solutions: Mapped[List["Solution"]] = relationship(back_populates="team")