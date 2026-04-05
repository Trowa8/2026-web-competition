from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Leaderboard(Base):
    __tablename__ = "leaderboard"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    tournament_id: Mapped[str] = mapped_column(String, ForeignKey("tournaments.id"), nullable=False)
    team_id: Mapped[str] = mapped_column(String, ForeignKey("teams.id"), nullable=False)
    place: Mapped[int] = mapped_column(Integer, nullable=False)
    mark: Mapped[int] = mapped_column(Integer, nullable=False)

    tournament: Mapped["Tournament"] = relationship(back_populates="leaderboard")
    team: Mapped["Team"] = relationship()