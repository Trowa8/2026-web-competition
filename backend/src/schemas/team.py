from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class TeamSummaryResponse(BaseModel):
    id: str
    name: str
    member_count: int


class TeamMemberResponse(BaseModel):
    user_id: int
    role: str

class TeamDetailResponse(BaseModel):
    team_id: int
    name: str
    description: Optional[str]
    owner_id: int
    members: List[TeamMemberResponse]
    created_at: datetime


class TeamCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None

class TeamCreateResponse(BaseModel):
    team_id: int
    name: str
    description: Optional[str]
    owner_id: int
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