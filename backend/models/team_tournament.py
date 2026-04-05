from typing import Optional
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base


class TeamTournament(Base):
    __tablename__ = "team_tournament"

    team_id: Mapped[str] = mapped_column(String, ForeignKey("teams.id"), primary_key=True)
    tournament_id: Mapped[str] = mapped_column(String, ForeignKey("tournaments.id"), primary_key=True)
    team_name: Mapped[str] = mapped_column(String, nullable=False)
    team_image: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    team: Mapped["Team"] = relationship(back_populates="team_tournaments")
    tournament: Mapped["Tournament"] = relationship(back_populates="team_tournaments")