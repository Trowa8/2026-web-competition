from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class SolutionToJudgeResponse(BaseModel):
    solution_id: str
    task_title: str
    uploaded_at: datetime

class SolutionJudgeDetailResponse(BaseModel):
    id: str
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