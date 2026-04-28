from pydantic import BaseModel
from typing import List


class TaskScoreResponse(BaseModel):
    task_id: str
    score: int

class LeaderboardEntryResponse(BaseModel):
    rank: int
    team_id: str
    team_name: str
    task_scores: List[TaskScoreResponse]
    total: int