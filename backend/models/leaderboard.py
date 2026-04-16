from sqlalchemy import String, Integer, ForeignKey, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Leaderboard(Base):
    __tablename__ = "leaderboard"

    __table_args__ = (
        UniqueConstraint("tournament_id", "team_id", name="uq_leaderboard_tournament_team"),
    )

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    tournament_id: Mapped[str] = mapped_column(String(32), ForeignKey("tournaments.id"), nullable=False)
    team_id: Mapped[str] = mapped_column(String(32), ForeignKey("teams.id"), nullable=False)
    place: Mapped[int] = mapped_column(Integer, nullable=False)
    total_score: Mapped[int] = mapped_column(Integer, nullable=False)

    tournament: Mapped["Tournament"] = relationship(back_populates="leaderboard")
    team: Mapped["Team"] = relationship(back_populates="leaderboard_entries")