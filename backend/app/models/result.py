from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

# ce modèle est juste indicatif pour la structure

class ImageModel(BaseModel):
    id: Optional[ObjectId] = Field(alias="_id")
    filename: str
    data: bytes
    user_id: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            bytes: lambda b: b.decode(errors='ignore')
        }
