from typing import List
from sqlalchemy import String, ForeignKey, UniqueConstraint, CheckConstraint, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class TournamentParticipation(Base):
    __tablename__ = "tournament_participation"

    __table_args__ = (
        UniqueConstraint("team_id", "tournament_id", name="uq_tournament_participation"),
        UniqueConstraint("tournament_id", "place", name="uq_leaderboard_tournament_place"),
        CheckConstraint("status IN ('registered', 'approved', 'disqualified', 'finished', 'withdrawn')", name="ck_tournament_participation_status"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    team_id: Mapped[str] = mapped_column(String(36), ForeignKey("teams.id"), nullable=False)
    tournament_id: Mapped[str] = mapped_column(String(36), ForeignKey("tournaments.id", ondelete="CASCADE"), nullable=False)
    team_name: Mapped[str] = mapped_column(String(128), nullable=False)
    status: Mapped[str] = mapped_column(String(36), nullable=False, default="registered")
    place: Mapped[int] = mapped_column(Integer, nullable=True)
    total_score: Mapped[int] = mapped_column(Integer, nullable=True)
 
    team: Mapped["Team"] = relationship(back_populates="tournament_participations")
    tournament: Mapped["Tournament"] = relationship(back_populates="tournament_participations")
    participants: Mapped[List["TournamentUserRole"]] = relationship(back_populates="tournament_participation", cascade="all, delete-orphan", passive_deletes=True)