from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from src.schemas.base import CamelModel


class TaskSummaryResponse(CamelModel):
    task_id: str
    title: str
    deadline: datetime
    is_open: bool

class TaskDetailResponse(CamelModel):
    task_id: str
    title: str
    description: Optional[str] = None
    deadline: datetime
    submission_start: datetime

class TaskCreateRequest(CamelModel):
    title: str
    description: Optional[str] = None
    deadline: datetime
    submission_start: datetime

class TaskUpdateRequest(CamelModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    submission_start: Optional[datetime] = None

class TaskCreateResponse(CamelModel):
    task_id: str
    title: str
    description: Optional[str] = None
    deadline: datetime
    submission_start: datetime
    tournament_id: str