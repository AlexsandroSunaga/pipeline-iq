from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.dependencies.session import get_db
from src.models.db.harvester import Connector, JobRun, QualityIssue, Record

router = APIRouter(prefix="/command", tags=["command"])


@router.get("/overview")
async def command_overview(db: AsyncSession = Depends(get_db)) -> dict:
    jobs = (await db.execute(select(JobRun))).scalars().all()
    records = (await db.execute(select(Record))).scalars().all()
    connectors = (await db.execute(select(Connector))).scalars().all()
    issues = (await db.execute(select(QualityIssue).where(QualityIssue.status == "open"))).scalars().all()
    success = sum(1 for j in jobs if j.status == "success")
    return {
        "connectors": len(connectors),
        "total_jobs": len(jobs),
        "successful_jobs": success,
        "warehouse_rows": len(records),
        "open_quality_issues": len(issues),
    }
