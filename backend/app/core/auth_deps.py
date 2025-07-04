from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.security.utils import get_authorization_scheme_param
import jwt
from typing import Optional
from datetime import datetime, timedelta
from app.core.config import SECRET_KEY, ALGORITHM

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def optional_auth(request: Request) -> Optional[dict]:
    auth = request.headers.get("Authorization")
    if not auth:
        return None
    
    scheme, token = get_authorization_scheme_param(auth)
    if scheme.lower() != "bearer" or not token:
        return None

    try:
        payload = verify_token(token)
        return payload
    except Exception:
        return None


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        user_id: str = payload.get("user_id")
        
        if not email and not user_id and not payload.get("sub"):
            raise HTTPException(status_code=401, detail="Invalid Token - missing infos")
        
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Expired Token")
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid Token: {str(e)}")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    return payload

def require_auth(current_user: dict = Depends(get_current_user)):
    return current_user