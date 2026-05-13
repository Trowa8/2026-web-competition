from fastapi import HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.solution import Solution
from src.crud.solution import (
    create_solution,
    get_solution_by_task_and_team,
    get_solutions_by_task,
)
from src.crud.task import get_task_by_id_only
from src.crud.team import get_captain_by_team
from src.supabase import supabase
from src.schemas.solution import (
    SolutionCreateRequest,
    SolutionCreateResponse,
    SolutionDetailResponse,
    SolutionSummaryResponse,
    SolutionUploadResponse,
)

BUCKET = "Solution-bucket"

async def _get_task_or_404(db, task_id):
    task = await get_task_by_id_only(db, task_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

def _sanitize_filename(name: str) -> str:
    return name.replace(" ", "_")

def _file_path(tournament_id: str, task_id: str, team_id: str, file_name: str) -> str:
    return f"{tournament_id}/{task_id}/{team_id}/{_sanitize_filename(file_name)}"

def _get_public_url(path: str) -> str:
    return supabase.storage.from_(BUCKET).get_public_url(path)


async def upload_file_service(
    task_id: str, team_id: str, file: UploadFile, current_user_id: str, db: AsyncSession
) -> SolutionUploadResponse:
    captain = await get_captain_by_team(db, team_id, current_user_id)
    if not captain:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the team captain can upload solutions")

    task = await _get_task_or_404(db, task_id)
    file_bytes = await file.read()
    sanitized = _sanitize_filename(file.filename)
    path = _file_path(task.tournament_id, task_id, team_id, sanitized)
    supabase.storage.from_(BUCKET).upload(path, file_bytes, {"upsert": "true"})
    return SolutionUploadResponse(file_name=sanitized)

async def create_solution_service(
    db: AsyncSession, data: SolutionCreateRequest, current_user_id: str
) -> SolutionCreateResponse:
    captain = await get_captain_by_team(db, data.team_id, current_user_id)
    if not captain:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the team captain can submit solutions")

    task = await _get_task_or_404(db, data.task_id)
    path = _file_path(task.tournament_id, data.task_id, data.team_id, data.file_name)

    existing = await get_solution_by_task_and_team(db, data.task_id, data.team_id)
    if existing:
        existing.file = path
        await db.commit()
        return SolutionCreateResponse(
            solution_id=existing.id,
            task_id=existing.task_id,
            team_id=existing.team_id,
            file_name=data.file_name,
        )

    solution = Solution(team_id=data.team_id, task_id=data.task_id, file=path)
    await create_solution(db, solution)

    return SolutionCreateResponse(
        solution_id=solution.id,
        task_id=solution.task_id,
        team_id=solution.team_id,
        file_name=data.file_name,
    )

async def list_solutions_service(
    db: AsyncSession, task_id: str
) -> list[SolutionSummaryResponse]:
    await _get_task_or_404(db, task_id)
    solutions = await get_solutions_by_task(db, task_id)
    return [
        SolutionSummaryResponse(
            solution_id=s.id,
            team_id=s.team_id,
            file_name=s.file.split("/")[-1],
        )
        for s in solutions
    ]

async def get_solution_service(
    db: AsyncSession, task_id: str, team_id: str
) -> SolutionDetailResponse:
    await _get_task_or_404(db, task_id)
    solution = await get_solution_by_task_and_team(db, task_id, team_id)
    if not solution:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")

    return SolutionDetailResponse(
        solution_id=solution.id,
        file_name=solution.file.split("/")[-1],
        file_url=_get_public_url(solution.file),
    )