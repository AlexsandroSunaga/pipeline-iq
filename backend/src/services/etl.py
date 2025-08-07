"""Fetch public APIs, validate, dedupe, persist."""

import json
from datetime import datetime

import httpx
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.db.harvester import JobRun, Record


async def run_ingestion_job(db: AsyncSession, source: str) -> JobRun:
    job = JobRun(source=source, status="running", created_at=datetime.utcnow().isoformat())
    db.add(job)
    await db.commit()
    await db.refresh(job)

    try:
        rows = 0
        if source == "posts":
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.get("https://jsonplaceholder.typicode.com/posts")
                resp.raise_for_status()
                data = resp.json()
            for item in data:
                ext = str(item["id"])
                payload = json.dumps(item)
                existing = await db.execute(
                    select(Record).where(Record.source == source, Record.external_id == ext)
                )
                if existing.scalar_one_or_none():
                    continue
                db.add(Record(source=source, external_id=ext, payload=payload))
                rows += 1
        elif source == "weather":
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.get(
                    "https://api.open-meteo.com/v1/forecast",
                    params={"latitude": 52.52, "longitude": 13.41, "hourly": "temperature_2m"},
                )
                resp.raise_for_status()
                data = resp.json()
            hourly = data.get("hourly", {})
            times = hourly.get("time", [])[:24]
            temps = hourly.get("temperature_2m", [])[:24]
            for t, temp in zip(times, temps, strict=False):
                if temp is None:
                    continue
                ext = f"berlin-{t}"
                db.add(
                    Record(
                        source=source,
                        external_id=ext,
                        payload=json.dumps({"time": t, "temp_c": temp}),
                    )
                )
                rows += 1
        elif source == "listings":
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.get("https://jsonplaceholder.typicode.com/users")
                resp.raise_for_status()
                for item in resp.json():
                    ext = f"user-{item['id']}"
                    existing = await db.execute(
                        select(Record).where(Record.source == source, Record.external_id == ext)
                    )
                    if existing.scalar_one_or_none():
                        continue
                    db.add(
                        Record(
                            source=source,
                            external_id=ext,
                            payload=json.dumps(
                                {
                                    "name": item.get("name"),
                                    "company": item.get("company", {}).get("name"),
                                    "city": item.get("address", {}).get("city"),
                                    "email": item.get("email"),
                                }
                            ),
                        )
                    )
                    rows += 1
        else:
            raise HTTPException(400, "Unknown source")

        job.status = "success"
        job.rows = rows
        job.log = f"Inserted {rows} rows"
        await db.commit()
        return job
    except Exception as exc:  # noqa: BLE001
        job.status = "failed"
        job.log = str(exc)
        await db.commit()
        return job
