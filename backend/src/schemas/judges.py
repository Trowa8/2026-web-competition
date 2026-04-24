from pydantic import BaseModel


class AssignJudgeRequest(BaseModel):
    user_id: str

class JudgeResponse(BaseModel):
    user_id: str
    nickname: str