from pymongo import MongoClient
from passlib.hash import bcrypt
from app.core.config import MONGO_URI
from fastapi import HTTPException

client = MongoClient(MONGO_URI)
db = client.get_default_database()
users = db["users"]

def create_user(username: str, email: str, password: str):
    if users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = bcrypt.hash(password)

    user = {
        "username": username,
        "email": email,
        "password": hashed_pw
    }

    result = users.insert_one(user)
    return str(result.inserted_id)

def authenticate_user(email: str, password: str):    
    try:
        user = users.find_one({"email" : email})
        
        if not user:
            return None
        
        if bcrypt.verify(password, user["password"]):
            return user
        else:
            return None

    except:
        return None
