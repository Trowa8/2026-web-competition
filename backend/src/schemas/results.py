from typing import List
from src.schemas.base import CamelModel

class TaskScoreResponse(CamelModel):
    task_id: str
    score: int

class LeaderboardEntryResponse(CamelModel):
    rank: int
    team_id: str
    team_name: str
    task_scores: List[TaskScoreResponse]
    total: int