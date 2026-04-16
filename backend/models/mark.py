from sqlalchemy import String, Integer, ForeignKey, UniqueConstraint, CheckConstraint, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from .base import Base, gen_uuid


class Mark(Base):
    __tablename__ = "marks"

    __table_args__ = (
        UniqueConstraint("solution_id", "judge_id", name="uq_mark_solution_judge"),
    )

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    judge_id: Mapped[str] = mapped_column(String(32), ForeignKey("users.id"), nullable=False)
    solution_id: Mapped[str] = mapped_column(String(32), ForeignKey("solutions.id"), nullable=False)

    judge: Mapped["User"] = relationship(foreign_keys=[judge_id])
    solution: Mapped["Solution"] = relationship(back_populates="marks")