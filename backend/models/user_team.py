from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base


class UserTeam(Base):
    __tablename__ = "user_team"

    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    team_id: Mapped[str] = mapped_column(String, ForeignKey("teams.id"), primary_key=True)
    is_captain: Mapped[bool] = mapped_column(Boolean, default=False)

    user: Mapped["User"] = relationship(back_populates="user_teams")
    team: Mapped["Team"] = relationship(back_populates="user_teams")