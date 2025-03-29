from fastapi import APIRouter
from app.api.v1.endpoints import auth, icp

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(icp.router, prefix="/icp", tags=["icp"]) 