from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class SolutionToJudgeResponse(BaseModel):
    solution_id: str
    task_title: str

class SolutionJudgeDetailResponse(BaseModel):
    solution_id: str
    task_title: str
    file_url: str

class SubmitScoreRequest(BaseModel):
    score: int = Field(..., ge=1, le=10)
    comment: Optional[str] = None


class UpdateScoreRequest(BaseModel):
    score: Optional[int] = Field(None, ge=1, le=10)
    comment: Optional[str] = None

class MyScoreResponse(BaseModel):
    solution_id: str
    score: int
    comment: Optional[str] = None

class MarkResponse(BaseModel):
    mark_id: str
    solution_id: str
    judge_id: str
    score: int
    comment: Optional[str] = None
    created_at: datetime