from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserMeResponse(BaseModel):
    id: str
    nickname: str
    email: EmailStr
    phone: Optional[str]
    role: str


class UserUpdateRequest(BaseModel):
    nickname: Optional[str] = None
    phone: Optional[str] = None

class UserTournamentResponse(BaseModel):
    id: str
    name: str
    start_date: datetime
    registration_deadline: datetime
    status: str