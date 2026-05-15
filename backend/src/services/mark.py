from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from src.crud.tournament import update_total_score, get_participation_by_team
from models.solution import Solution
from models.task import Task
from models.mark import Mark
from src.crud.mark import (
    create_mark,
    get_judge_role,
    get_mark_by_id,
    get_mark_by_solution_and_judge,
    get_marks_by_solution,
    get_tournament_role,
    update_mark,
)
from src.crud.solution import get_solution_by_id
from src.crud.task import get_task_by_id_only
from src.schemas.judging import MarkResponse, SubmitScoreRequest, UpdateScoreRequest

async def _get_solution_or_404(db, solution_id):
    solution = await get_solution_by_id(db, solution_id)
    if not solution:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    return solution

async def _get_tournament_id(db, solution):
    task = await get_task_by_id_only(db, solution.task_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task.tournament_id

async def _require_judge(db, tournament_id, user_id):
    role = await get_judge_role(db, tournament_id, user_id)
    if not role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only judges can perform this action")
    return role

async def _require_judge_or_organizer(db, tournament_id, user_id):
    role = await get_tournament_role(db, tournament_id, user_id)
    if not role or role.role not in ("judge", "organizer"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only judges and organizers can view marks")

def _to_response(mark: Mark) -> MarkResponse:
    return MarkResponse(
        mark_id=mark.id,
        solution_id=mark.solution_id,
        judge_id=mark.judge_id,
        score=mark.score,
        comment=mark.comment,
        created_at=mark.created_at,
    )
    
async def _recalculate_total(db: AsyncSession, solution) -> None:
    task = await get_task_by_id_only(db, solution.task_id)
    
    result = await db.execute(
        select(func.sum(Mark.score))
        .join(Solution, Solution.id == Mark.solution_id)
        .join(Task, Task.id == Solution.task_id)
        .where(Solution.team_id == solution.team_id, Task.tournament_id == task.tournament_id)
    )
    total = result.scalar_one_or_none() or 0

    participation = await get_participation_by_team(db, task.tournament_id, solution.team_id)
    if participation:
        await update_total_score(db, participation, total)

async def submit_score_service(
    db: AsyncSession, solution_id: str, data: SubmitScoreRequest, current_user_id: str
) -> MarkResponse:
    solution = await _get_solution_or_404(db, solution_id)
    tournament_id = await _get_tournament_id(db, solution)
    judge_role = await _require_judge(db, tournament_id, current_user_id)

    if await get_mark_by_solution_and_judge(db, solution_id, judge_role.id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You have already scored this solution")

    mark = Mark(
        solution_id=solution_id,
        judge_id=judge_role.id,
        score=data.score,
        comment=data.comment,
    )
    await create_mark(db, mark)
    await _recalculate_total(db, solution)
    return _to_response(mark)

async def list_marks_service(
    db: AsyncSession, solution_id: str, current_user_id: str
) -> list[MarkResponse]:
    solution = await _get_solution_or_404(db, solution_id)
    tournament_id = await _get_tournament_id(db, solution)
    await _require_judge_or_organizer(db, tournament_id, current_user_id)

    marks = await get_marks_by_solution(db, solution_id)
    return [_to_response(m) for m in marks]

async def update_score_service(
    db: AsyncSession, solution_id: str, mark_id: str, data: UpdateScoreRequest, current_user_id: str
) -> MarkResponse:
    solution = await _get_solution_or_404(db, solution_id)
    tournament_id = await _get_tournament_id(db, solution)
    judge_role = await _require_judge(db, tournament_id, current_user_id)

    mark = await get_mark_by_id(db, mark_id)
    if not mark or mark.solution_id != solution_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mark not found")
    if mark.judge_id != judge_role.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only edit your own marks")

    mark = await update_mark(db, mark, data.score, data.comment)
    await _recalculate_total(db, solution)
    return _to_response(mark)