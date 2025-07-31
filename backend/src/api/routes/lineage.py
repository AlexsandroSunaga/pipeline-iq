from fastapi import APIRouter

router = APIRouter(prefix="/lineage", tags=["lineage"])


@router.get("/jobs/{job_id}")
async def job_lineage(job_id: str):
    return {
        "job_id": job_id,
        "nodes": [
            {"id": "src", "kind": "source", "label": f"connector:{job_id}"},
            {"id": "raw", "kind": "landing", "label": "raw.landing"},
            {"id": "dq", "kind": "quality", "label": "quality.gates"},
            {"id": "curated", "kind": "warehouse", "label": "curated.marts"},
        ],
        "edges": [
            {"from": "src", "to": "raw"},
            {"from": "raw", "to": "dq"},
            {"from": "dq", "to": "curated"},
        ],
    }
