import json

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.dependencies.session import get_db
from src.models.db.harvester import Record

router = APIRouter(prefix="/records", tags=["records"])


@router.get("")
async def records(
    source: str | None = None,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    q = select(Record).order_by(Record.id.desc()).limit(limit)
    if source:
        q = q.where(Record.source == source)
    result = await db.execute(q)
    return [
        {"id": r.id, "source": r.source, "external_id": r.external_id, "payload": json.loads(r.payload)}
        for r in result.scalars().all()
    ]
