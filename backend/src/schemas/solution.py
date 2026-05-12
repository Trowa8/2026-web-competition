from pydantic import BaseModel


class SolutionSummaryResponse(BaseModel):
    solution_id: str
    team_id: str
    file_name: str

class SolutionDetailResponse(BaseModel):
    solution_id: str
    file_name: str
    file_url: str

class SolutionCreateRequest(BaseModel):
    task_id: str
    team_id: str
    file_name: str

class SolutionCreateResponse(BaseModel):
    solution_id: str
    task_id: str
    team_id: str
    file_name: str

class SolutionUploadResponse(BaseModel):
    file_name: str