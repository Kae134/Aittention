import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

MONGO_URI = os.getenv("MONGO_URI")
REDIS_URL = os.getenv("REDIS_URL")
