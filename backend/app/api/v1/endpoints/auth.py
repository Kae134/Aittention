from fastapi import APIRouter, HTTPException
from datetime import timedelta
from app.models.user import UserCreate, UserOut, UserLogin
from app.core.storage_auth import create_user, authenticate_user
from app.core.auth_deps import create_access_token
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate):
    try:
        user_id = create_user(user.username, user.email, user.password)
        return {"_id": user_id, "email": user.email, "username": user.username}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Registration failed")

@router.post("/login")
def login(user: UserLogin):
    try:        
        db_user = authenticate_user(user.email, user.password)
        if not db_user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        token_payload = {
            "sub": user.email,
            "email": db_user["email"],
            "user_id": str(db_user["_id"]),
            "username": db_user.get("username", "")
        }
        
        token = create_access_token(
            token_payload,
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        return {
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "email": db_user["email"],
                "username": db_user.get("username", ""),
                "user_id": str(db_user["_id"])
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Login failed: {str(e)}")