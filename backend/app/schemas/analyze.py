from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class AnalyzeResponse(BaseModel):
    message: str
    image_id: str

    class Config:
        schema_extra = {
            "example": {
                "message": "Image received",
                "image_id": "66320d3d8a3e47d0eab7f9ef"
            }
        }
