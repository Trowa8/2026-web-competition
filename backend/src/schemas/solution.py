from pydantic import BaseModel
from src.schemas.base import CamelModel


class SolutionSummaryResponse(CamelModel):
    solution_id: str
    team_id: str
    file_name: str

class SolutionDetailResponse(CamelModel):
    solution_id: str
    file_name: str
    file_url: str

class SolutionCreateRequest(CamelModel):
    task_id: str
    team_id: str
    file_name: str

class SolutionCreateResponse(CamelModel):
    solution_id: str
    task_id: str
    team_id: str
    file_name: str

class SolutionUploadResponse(CamelModel):
    file_name: str