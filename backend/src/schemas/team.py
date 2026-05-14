from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from src.schemas.base import CamelModel


class TeamSummaryResponse(CamelModel):
    team_id: str
    name: str
    member_count: int

class TeamMemberResponse(CamelModel):
    user_id: str
    role: str

class TeamDetailResponse(CamelModel):
    team_id: str
    name: str
    description: Optional[str] = None
    owner_id: str
    members: List[TeamMemberResponse]
    created_at: datetime

class TeamCreateRequest(CamelModel):
    name: str
    description: Optional[str] = None

class TeamCreateResponse(CamelModel):
    team_id: str
    name: str
    description: Optional[str] = None
    owner_id: str
    created_at: datetime

class TeamUpdateRequest(CamelModel):
    name: Optional[str] = None
    description: Optional[str] = None

class InviteMemberRequest(CamelModel):
    user_id: str

class SetMemberRoleRequest(CamelModel):
    role: str

class TeamHistoryItemResponse(CamelModel):
    tournament_id: str
    name: str
    place: int
    score: int
    
class TeamCodeResponse(CamelModel):
    team_code: str

class TeamJoinRequest(CamelModel):
    team_code: str

class AppointCaptainRequest(CamelModel):
    user_id: str