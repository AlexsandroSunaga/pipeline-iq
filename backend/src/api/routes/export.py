import json

import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.dependencies.session import get_db
from src.models.db.harvester import Record

router = APIRouter(prefix="/export", tags=["export"])


@router.get("/{source}.csv")
async def export_csv(source: str, db: AsyncSession = Depends(get_db)) -> StreamingResponse:
    result = await db.execute(select(Record).where(Record.source == source))
    rows = result.scalars().all()
    if not rows:
        raise HTTPException(404, "No data")
    df = pd.DataFrame([json.loads(r.payload) for r in rows])
    stream = df.to_csv(index=False)
    return StreamingResponse(
        iter([stream]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={source}.csv"},
    )
