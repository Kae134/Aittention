from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class ImageModel(BaseModel):
    id: Optional[ObjectId] = Field(alias="_id")
    filename: str
    url: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
