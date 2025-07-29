from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.dependencies.session import get_db
from src.models.db.harvester import Connector, JobSchedule, QualityIssue

router = APIRouter(tags=["connectors"])


@router.get("/connectors")
async def list_connectors(db: AsyncSession = Depends(get_db)) -> list[dict]:
    rows = (await db.execute(select(Connector))).scalars().all()
    return [
        {
            "code": c.code,
            "name": c.name,
            "owner_team": c.owner_team,
            "sla_minutes": c.sla_minutes,
            "status": c.status,
        }
        for c in rows
    ]


@router.get("/schedules")
async def list_schedules(db: AsyncSession = Depends(get_db)) -> list[dict]:
    rows = (await db.execute(select(JobSchedule))).scalars().all()
    return [
        {
            "id": s.id,
            "connector_code": s.connector_code,
            "cron_label": s.cron_label,
            "enabled": bool(s.enabled),
        }
        for s in rows
    ]


@router.get("/quality/issues")
async def quality_issues(db: AsyncSession = Depends(get_db)) -> list[dict]:
    rows = (await db.execute(select(QualityIssue))).scalars().all()
    return [
        {
            "id": q.id,
            "connector_code": q.connector_code,
            "rule": q.rule,
            "severity": q.severity,
            "status": q.status,
        }
        for q in rows
    ]
