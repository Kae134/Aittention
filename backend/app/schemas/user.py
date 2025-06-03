from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    email: str

class User(BaseModel):
    username: str
    email: str

