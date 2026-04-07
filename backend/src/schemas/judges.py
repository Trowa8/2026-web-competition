from pydantic import BaseModel
from typing import List


class AssignJudgeRequest(BaseModel):
    user_id: str

class JudgeResponse(BaseModel):
    user_id: str
    nickname: str