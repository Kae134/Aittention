from fastapi import APIRouter
from .endpoints import images, HelloWorld

router = APIRouter()
router.include_router(images.router, prefix="/images", tags=["Image"])
router.include_router(HelloWorld.router, prefix="/hello", tags=["HelloWorld"])