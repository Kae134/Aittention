from fastapi import APIRouter
from .endpoints import analyze

router = APIRouter()
router.include_router(analyze.router, prefix="/analyze", tags=["analyze"])
