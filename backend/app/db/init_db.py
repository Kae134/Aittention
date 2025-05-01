from pymongo import MongoClient
from app.core.config import MONGO_URI

def init_mongodb():
    client = MongoClient(MONGO_URI)
    db = client.get_default_database()
    db["images"].create_index("created_at")
    print(f"MongoDB initialized on {MONGO_URI}")

if __name__ == "__main__":
    init_mongodb()
