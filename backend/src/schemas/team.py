from pydantic import BaseModel
from typing import Optional, List


class TeamSummaryResponse(BaseModel):
    id: str
    name: str
    member_count: int


class TeamMemberResponse(BaseModel):
    user_id: str
    nickname: str
    role: str

class TeamDetailResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    team_code: str         
    members: List[TeamMemberResponse]


class TeamCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None


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