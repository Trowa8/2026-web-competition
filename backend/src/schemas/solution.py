from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SolutionSummaryResponse(BaseModel):
    id: str
    team_id: str
    file_name: str
    uploaded_at: datetime
    version: int

class MySolutionResponse(BaseModel):
    id: str
    file_name: str
    uploaded_at: datetime
    version: int