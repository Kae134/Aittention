import os
from pymongo import MongoClient
from bson import ObjectId

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["image_db"]
collection = db["images"]

def store_image(filename: str, content: bytes) -> ObjectId:
    result = collection.insert_one({
        "filename": filename,
        "data": content,
    })
    return result.inserted_id
