from pydantic import BaseModel, EmailStr


class SignInRequest(BaseModel):
    login: str
    password: str

class TokenResponse(BaseModel):
    refresh_token: str
    access_token: str
    user_id: int
    token_type: str = "bearer"

class SignUpRequest(BaseModel):
    login: str
    password: str
    email: EmailStr
    role: str

class SignUpResponse(BaseModel):
    refresh_token: str
    access_token: str
    user_id: int