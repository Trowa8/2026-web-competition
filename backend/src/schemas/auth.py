from pydantic import BaseModel, EmailStr


class SignInRequest(BaseModel):
    login: str
    password: str

class TokenResponse(BaseModel):
    refresh_token: str
    access_token: str
    user_id: str
    token_type: str = "bearer"

class SignUpRequest(BaseModel):
    login: str
    password: str
    email: EmailStr 
    role: str = "participant"

class SignUpResponse(BaseModel):
    refresh_token: str
    access_token: str
    user_id: str

class TokenData(BaseModel):
    user_id: str
    token_type: str
    
class RefreshRequest(BaseModel):
    refresh_token: str