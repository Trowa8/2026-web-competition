from pydantic import BaseModel
from typing import List, Optional


class TaskScoreResponse(BaseModel):
    task_id: str
    score: int

class LeaderboardEntryResponse(BaseModel):
    rank: Optional[int]
    team_id: str
    team_name: str
    task_scores: List[TaskScoreResponse]
    total: int