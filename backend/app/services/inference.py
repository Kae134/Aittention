import shutil
from fastapi import UploadFile
from pathlib import Path

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

async def analyze_image(file: UploadFile):
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        # louis tu devras rechanger ça c'est juste temporaire
    return {"message": f"{file.filename} uploaded and analyzed."}
