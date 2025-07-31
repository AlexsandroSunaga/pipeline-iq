from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.dependencies.session import get_db
from src.models.db.harvester import JobRun
from src.services.etl import run_ingestion_job

router = APIRouter(prefix="/jobs", tags=["jobs"])

ALLOWED_SOURCES = ("posts", "weather", "listings")


@router.get("")
async def list_jobs(db: AsyncSession = Depends(get_db)) -> list[dict]:
    result = await db.execute(select(JobRun).order_by(JobRun.id.desc()).limit(50))
    return [
        {
            "id": j.id,
            "source": j.source,
            "status": j.status,
            "rows": j.rows,
            "log": j.log,
            "created_at": j.created_at,
        }
        for j in result.scalars().all()
    ]


@router.post("/{source}")
async def trigger(source: str, db: AsyncSession = Depends(get_db)) -> dict:
    if source not in ALLOWED_SOURCES:
        raise HTTPException(400, "Use posts, weather, or listings")
    job = await run_ingestion_job(db, source)
    return {"id": job.id, "status": job.status, "rows": job.rows, "log": job.log}
