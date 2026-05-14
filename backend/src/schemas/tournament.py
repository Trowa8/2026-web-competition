from datetime import datetime
from typing import Optional
from src.schemas.base import CamelModel


class TournamentSummaryResponse(CamelModel):
    id: str
    name: str
    start_date: datetime
    registration_deadline: datetime

class TournamentCreateResponse(CamelModel):
    id: str
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime
    created_by: str
    created_at: datetime

class TournamentCreateRequest(CamelModel):
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime

class TournamentUpdateRequest(CamelModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    registration_deadline: Optional[datetime] = None
    
class TournamentDetailResponse(CamelModel):
    id: str
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    registration_deadline: datetime
    created_by: str
    created_at: datetime
    
class TournamentDeleteResponse(CamelModel):
    success: bool
 
class RegisterTeamRequest(CamelModel):
    team_id: str
 
class RegisterTeamResponse(CamelModel):
    success: bool