from pydantic import BaseModel, EmailStr
from src.schemas.base import CamelModel


class SignInRequest(CamelModel):
    email: EmailStr
    password: str

class TokenResponse(CamelModel):
    refresh_token: str
    access_token: str
    user_id: str
    token_type: str = "bearer"

class SignUpRequest(CamelModel):
    login: str
    password: str
    email: EmailStr 

class TokenData(CamelModel):
    user_id: str
    token_type: str
    
class RefreshRequest(CamelModel):
    refresh_token: str