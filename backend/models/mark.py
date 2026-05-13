from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, String, Integer, ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid, utcnow


class Mark(Base):
    __tablename__ = "marks"

    __table_args__ = (
        UniqueConstraint("solution_id", "judge_id", name="uq_mark_solution_judge"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    judge_id: Mapped[str] = mapped_column(String(36), ForeignKey("tournament_user_role.id", ondelete="CASCADE"), nullable=False)
    solution_id: Mapped[str] = mapped_column(String(36), ForeignKey("solutions.id", ondelete="CASCADE"), nullable=False)
    comment: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=utcnow)

    judge: Mapped["TournamentUserRole"] = relationship(foreign_keys=[judge_id])
    solution: Mapped["Solution"] = relationship(back_populates="marks")