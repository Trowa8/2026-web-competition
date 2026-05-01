from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class TeamSummaryResponse(BaseModel):
    team_id: str
    name: str
    member_count: int

class TeamMemberResponse(BaseModel):
    user_id: str
    role: str

class TeamDetailResponse(BaseModel):
    team_id: str
    name: str
    description: Optional[str] = None
    captain_id: Optional[str]
    members: List[TeamMemberResponse]
    created_at: datetime

class TeamCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None

class TeamCreateResponse(BaseModel):
    team_id: str
    name: str
    description: Optional[str] = None
    captain_id: str
    created_at: datetime

class TeamUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class InviteMemberRequest(BaseModel):
    user_id: str

class SetMemberRoleRequest(BaseModel):
    role: str

class TeamHistoryItemResponse(BaseModel):
    tournament_id: str
    name: str
    place: int
    score: int
    
class TeamDeleteResponse(BaseModel):
    success: bool

class TeamCodeResponse(BaseModel):
    team_code: str

class TeamJoinRequest(BaseModel):
    team_code: str

class TeamJoinResponse(BaseModel):
    success: bool

class AppointCaptainRequest(BaseModel):
    user_id: str