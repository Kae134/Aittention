from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserOut
from app.core.storage_auth import create_user, authenticate_user

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate):
    user_id = create_user(user.email, user.password)
    return {"_id": user_id, "email": user.email}

@router.post("/login")
def login(user: UserCreate):
    db_user = authenticate_user(user.email, user.password)
    return {"message": "Login successful", "user_id": str(db_user["_id"])}
