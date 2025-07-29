from fastapi import APIRouter

from src.api.routes import catalog, command, connectors, destinations, export, health, integrations, jobs, lineage, records

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(integrations.router)
api_router.include_router(jobs.router)
api_router.include_router(records.router)
api_router.include_router(export.router)
api_router.include_router(command.router)
api_router.include_router(connectors.router)
api_router.include_router(catalog.router)
api_router.include_router(lineage.router)
api_router.include_router(destinations.router)
