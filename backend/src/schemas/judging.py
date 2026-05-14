from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from src.schemas.base import CamelModel


class SolutionToJudgeResponse(CamelModel):
    solution_id: str
    task_title: str

class SolutionJudgeDetailResponse(CamelModel):
    solution_id: str
    task_title: str
    file_url: str

class SubmitScoreRequest(CamelModel):
    score: int = Field(..., ge=1, le=10)
    comment: Optional[str] = None


class UpdateScoreRequest(CamelModel):
    score: Optional[int] = Field(None, ge=1, le=10)
    comment: Optional[str] = None

class MyScoreResponse(CamelModel):
    solution_id: str
    score: int
    comment: Optional[str] = None

class MarkResponse(CamelModel):
    mark_id: str
    solution_id: str
    judge_id: str
    score: int
    comment: Optional[str] = None
    created_at: datetime