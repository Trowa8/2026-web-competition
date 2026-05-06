from typing import List
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Solution(Base):
    __tablename__ = "solutions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    team_id: Mapped[str] = mapped_column(String(36), ForeignKey("teams.id"), nullable=False)
    task_id: Mapped[str] = mapped_column(String(36), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    file: Mapped[str] = mapped_column(String(255), nullable=False)

    team: Mapped["Team"] = relationship(back_populates="solutions")
    task: Mapped["Task"] = relationship(back_populates="solutions")
    marks: Mapped[List["Mark"]] = relationship(back_populates="solution", cascade="all, delete-orphan")