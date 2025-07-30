"""Webhook and batch destinations (Airbyte-style demo)."""

from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/destinations", tags=["destinations"])

_STORE: list[dict] = []


class DestinationCreate(BaseModel):
    name: str = Field(min_length=2)
    kind: str = Field(default="webhook", pattern="^(webhook|s3|snowflake|bigquery)$")
    url: str | None = None
    enabled: bool = True


@router.get("")
def list_destinations():
    return {"items": _STORE, "total": len(_STORE)}


@router.post("")
def create_destination(body: DestinationCreate):
    row = {
        "id": str(uuid4()),
        "name": body.name,
        "kind": body.kind,
        "url": body.url or "https://hooks.example.com/pipeline-iq",
        "enabled": body.enabled,
        "last_sync_status": "idle",
    }
    _STORE.append(row)
    return row


@router.post("/{dest_id}/test")
def test_destination(dest_id: str):
    for d in _STORE:
        if d["id"] == dest_id:
            d["last_sync_status"] = "delivered_demo"
            return {"ok": True, "dest_id": dest_id, "bytes": 12840}
    return {"ok": False, "error": "not_found"}
