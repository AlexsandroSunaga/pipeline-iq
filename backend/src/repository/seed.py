from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.db.harvester import Connector, JobSchedule, QualityIssue


async def seed_demo(db: AsyncSession) -> None:
    if (await db.execute(select(Connector).limit(1))).scalar_one_or_none():
        return
    db.add_all(
        [
            Connector(code="posts", name="Reference posts API", owner_team="Analytics", sla_minutes=30),
            Connector(code="weather", name="Open-Meteo weather", owner_team="Data Eng", sla_minutes=120),
            Connector(code="listings", name="Directory listings", owner_team="Growth", sla_minutes=240),
        ]
    )
    db.add_all(
        [
            JobSchedule(connector_code="posts", cron_label="0 */6 * * *"),
            JobSchedule(connector_code="weather", cron_label="15 * * * *"),
            JobSchedule(connector_code="listings", cron_label="0 2 * * *"),
        ]
    )
    db.add_all(
        [
            QualityIssue(connector_code="posts", rule="Null title rate < 1%", severity="medium", status="open"),
            QualityIssue(connector_code="listings", rule="Email format valid", severity="high", status="monitoring"),
        ]
    )
    await db.commit()
