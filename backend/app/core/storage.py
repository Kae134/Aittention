import os
from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException
from typing import Optional, List

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client.get_default_database()
users_collection = db["users"]
images_collection = db["images"]

def store_image(filename: str, content: bytes, user_id: Optional[str] = None) -> ObjectId:
    if not user_id :
        image_doc = {
            "user_id": "",
            "filename": filename,
            "data": content
        }

    else :
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        image_doc = {
            "user_id": ObjectId(user_id),
            "filename": filename,
            "data": content
        }

    result = images_collection.insert_one(image_doc)
    return result.inserted_id

def get_image_by_id(image_id: str, user_id: Optional[str] = None):
    try:
        query = {"_id": ObjectId(image_id)}
        if user_id:
            query["user_id"] = ObjectId(user_id)

        image = images_collection.find_one(query)
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")
        return image
    
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image ID")

def get_user_images(user_id: str) -> List[dict]:
    images_cursor = images_collection.find({"user_id": ObjectId(user_id)}, {"data":0})
    images = []

    for image in images_cursor:
        image["_id"] = str(image["_id"])
        image["user_id"] = str(image["user_id"])
        images.append(image)

    return images