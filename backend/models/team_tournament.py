from typing import List
from sqlalchemy import String, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class TeamTournament(Base):
    __tablename__ = "team_tournament"

    __table_args__ = (
        UniqueConstraint("team_id", "tournament_id", name="uq_team_tournament"),
        CheckConstraint("status IN ('registered', 'approved', 'disqualified', 'finished', 'withdrawn')", name="ck_team_tournament_status"),
    )

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    team_id: Mapped[str] = mapped_column(String(32), ForeignKey("teams.id"), nullable=False)
    tournament_id: Mapped[str] = mapped_column(String(32), ForeignKey("tournaments.id"), nullable=False)
    team_name: Mapped[str] = mapped_column(String(128), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="registered")

    team: Mapped["Team"] = relationship(back_populates="team_tournaments")
    tournament: Mapped["Tournament"] = relationship(back_populates="team_tournaments")
    participants: Mapped[List["TournamentUserRole"]] = relationship(back_populates="team_tournament")