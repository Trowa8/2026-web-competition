from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Mark(Base):
    __tablename__ = "marks"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    mark: Mapped[int] = mapped_column(Integer, nullable=False)
    judge_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), nullable=False)
    solution_id: Mapped[str] = mapped_column(String, ForeignKey("solutions.id"), nullable=False)

    judge: Mapped["User"] = relationship(foreign_keys=[judge_id])
    solution: Mapped["Solution"] = relationship(back_populates="marks")