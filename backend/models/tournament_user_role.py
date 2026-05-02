from typing import Optional
from sqlalchemy import String, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class TournamentUserRole(Base):
    
    __tablename__ = "tournament_user_role"

    __table_args__ = (
        UniqueConstraint("user_id", "tournament_id", name="uq_tur_user_tournament"),
        CheckConstraint("role IN ('participant', 'judge', 'organizer')", name="ck_tur_role"),
        CheckConstraint(
            "(role = 'participant' AND tournament_participation_id IS NOT NULL) OR "
            "(role != 'participant' AND tournament_participation_id IS NULL)",
            name="ck_tur_participant_needs_team"
        ),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    tournament_id: Mapped[str] = mapped_column(String(36), ForeignKey("tournaments.id"), nullable=False)
    tournament_participation_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("tournament_participation.id"), nullable=True)
    role: Mapped[str] = mapped_column(String(36), nullable=False)
    user_name: Mapped[str] = mapped_column(String(64), nullable=False)

    user: Mapped["User"] = relationship(back_populates="tournament_roles")
    tournament: Mapped["Tournament"] = relationship(back_populates="user_roles")
    tournament_participation: Mapped[Optional["TournamentParticipation"]] = relationship(back_populates="participants")