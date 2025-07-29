"""Connector catalog (Airbyte-style metadata for demos)."""

from fastapi import APIRouter

router = APIRouter(prefix="/catalog", tags=["catalog"])

_CATALOG = [
    {"code": "salesforce", "name": "Salesforce", "type": "saas", "streams": 42, "cdc": True},
    {"code": "postgres", "name": "PostgreSQL", "type": "database", "streams": 128, "cdc": True},
    {"code": "stripe", "name": "Stripe", "type": "finance", "streams": 18, "cdc": False},
    {"code": "hubspot", "name": "HubSpot", "type": "crm", "streams": 24, "cdc": False},
    {"code": "s3", "name": "Amazon S3", "type": "object", "streams": 1, "cdc": False},
    {"code": "snowflake", "name": "Snowflake", "type": "warehouse", "streams": 0, "cdc": False, "destination": True},
]


@router.get("/connectors")
async def connector_catalog():
    return {"items": _CATALOG, "total": len(_CATALOG), "maintainer": "pipeline-iq-demo"}
