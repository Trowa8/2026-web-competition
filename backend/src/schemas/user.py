from pydantic import EmailStr
from typing import Optional
from datetime import datetime
from src.schemas.base import CamelModel


class UserResponse(CamelModel):
    user_id: str
    login: str
    email: EmailStr
    created_at: datetime


class UserUpdateRequest(CamelModel):
    login: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserUpdateResponse(CamelModel):
    user_id: str
    login: str
    email: EmailStr
    updated_at: datetime

class UserDeleteResponse(CamelModel):
    success: bool

class UserTournamentResponse(CamelModel):
    id: str
    name: str
    start_date: datetime
    registration_deadline: datetime
    status: str