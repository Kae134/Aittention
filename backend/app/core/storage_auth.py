from pymongo import MongoClient
from bson import ObjectId
from passlib.hash import bcrypt
from app.core.config import MONGO_URI
from fastapi import HTTPException

client = MongoClient(MONGO_URI)
db = client.get_default_database()
users = db["users"]

def create_user(email: str, password: str):
    if users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = bcrypt.hash(password)
    result = users.insert_one({"email": email, "password": hashed_pw})
    return str(result.inserted_id)

def authenticate_user(email: str, password: str):
    user = users.find_one({"email": email})
    if not user or not bcrypt.verify(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return user
