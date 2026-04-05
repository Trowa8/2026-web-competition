from typing import List
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Solution(Base):
    __tablename__ = "solutions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=gen_uuid)
    team_id: Mapped[str] = mapped_column(String, ForeignKey("teams.id"), nullable=False)
    task_id: Mapped[str] = mapped_column(String, ForeignKey("tasks.id"), nullable=False)
    tournament_id: Mapped[str] = mapped_column(String, ForeignKey("tournaments.id"), nullable=False)
    file: Mapped[str] = mapped_column(String, nullable=False)
    max_mark: Mapped[int] = mapped_column(Integer, nullable=False)

    team: Mapped["Team"] = relationship(back_populates="solutions")
    task: Mapped["Task"] = relationship(back_populates="solutions")
    tournament: Mapped["Tournament"] = relationship()
    marks: Mapped[List["Mark"]] = relationship(back_populates="solution")