import os
from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["image_db"]
collection = db["images"]

def store_image(filename: str, content: bytes) -> ObjectId:
    result = collection.insert_one({
        "filename": filename,
        "data": content,
    })
    return result.inserted_id

def get_image_by_id(image_id: str):
    try:
        image = collection.find_one({"_id": ObjectId(image_id)})
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image ID")
