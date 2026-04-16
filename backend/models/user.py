from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, ForeignKey, Boolean, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid, utcnow


class User(Base):
    __tablename__ = "users"

    __table_args__ = (CheckConstraint("is_captain = FALSE OR team_id IS NOT NULL", name="ck_captain_req_team"),)

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    username: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(256), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    refresh_token: Mapped[Optional[str]] = mapped_column(String(256), nullable=True)
    team_id: Mapped[Optional[str]] = mapped_column(String(32), ForeignKey("teams.id"), nullable=True)
    is_captain: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)

    team: Mapped[Optional["Team"]] = relationship(back_populates="members", foreign_keys=[team_id])
    tournament_participations: Mapped[List["TournamentParticipant"]] = relationship(back_populates="user")