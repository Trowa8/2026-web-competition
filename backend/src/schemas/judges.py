from src.schemas.base import CamelModel


class AssignJudgeRequest(CamelModel):
    user_id: str

class JudgeResponse(CamelModel):
    user_id: str
    nickname: str