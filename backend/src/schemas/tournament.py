from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TournamentSummaryResponse(BaseModel):
    id: str
    name: str
    start_date: datetime
    registration_deadline: datetime

class TournamentCreateResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime
    created_by: str
    created_at: datetime

class TournamentCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime

class TournamentUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    registration_deadline: Optional[datetime] = None
    
class TournamentDetailResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime
    created_by: str
    created_at: datetime
    
class TournamentDeleteResponse(BaseModel):
    success: bool
 
class RegisterTeamRequest(BaseModel):
    team_id: str
 
class RegisterTeamResponse(BaseModel):
    success: bool