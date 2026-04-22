from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, gen_uuid


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    tournament_id: Mapped[str] = mapped_column(String(36), ForeignKey("tournaments.id"), nullable=False)
    max_mark: Mapped[int] = mapped_column(Integer, nullable=False)

    tournament: Mapped["Tournament"] = relationship(back_populates="tasks")
    solutions: Mapped[List["Solution"]] = relationship(back_populates="task")