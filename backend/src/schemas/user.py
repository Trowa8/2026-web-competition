from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserResponse(BaseModel):
    user_id: int
    login: str
    email: EmailStr
    role: str
    created_at: datetime


class UserUpdateRequest(BaseModel):
    login: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserUpdateResponse(BaseModel):
    user_id: int
    login: str
    email: EmailStr
    role: str
    updated_at: datetime

class UserDeleteResponse(BaseModel):
    success: bool

class UserTournamentResponse(BaseModel):
    id: str
    name: str
    start_date: datetime
    registration_deadline: datetime
    status: str