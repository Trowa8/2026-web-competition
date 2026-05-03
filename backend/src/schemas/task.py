from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaskSummaryResponse(BaseModel):
    task_id: str
    title: str
    deadline: datetime
    is_open: bool

class TaskDetailResponse(BaseModel):
    task_id: str
    title: str
    description: str
    deadline: datetime
    submission_start: datetime

class TaskCreateRequest(BaseModel):
    title: str
    description: str
    deadline: datetime
    submission_start: datetime

class TaskUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    submission_start: Optional[datetime] = None

class TaskCreateResponse(BaseModel):
    task_id: str
    title: str
    description: str
    deadline: datetime
    submission_start: datetime
    tournament_id: str