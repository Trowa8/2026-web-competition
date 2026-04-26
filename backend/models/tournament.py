from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import String, DateTime, Text, ForeignKey, Integer, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
from .base import Base, gen_uuid, utcnow


class Tournament(Base):
    __tablename__ = "tournaments"

    __table_args__ = (
        CheckConstraint("max_teams > 0", name="ck_tournament_max_teams_positive"),
        CheckConstraint("status IN ('draft', 'registration', 'active', 'finished', 'cancelled')", name="ck_tournament_status"),
        CheckConstraint("start_date > registration_deadline", name="ck_tournament_start_after_registration_deadline"),
        CheckConstraint("end_date > start_date", name="ck_tournament_end_after_start"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    registration_deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    max_teams: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(String(36), nullable=False, default="draft")
    created_by: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utcnow)

    creator: Mapped["User"] = relationship(foreign_keys=[created_by])
    tournament_participations: Mapped[List["TournamentParticipation"]] = relationship(back_populates="tournament")
    tasks: Mapped[List["Task"]] = relationship(back_populates="tournament")
    user_roles: Mapped[List["TournamentUserRole"]] = relationship(back_populates="tournament")

    @validates("start_date")
    def validate_start_date(self, key, value: datetime):
        if value and value <= utcnow():
            raise ValueError("start_date too early")
        return value
