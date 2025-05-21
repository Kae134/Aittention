from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.image import validate_image
from app.core.storage import store_image, get_image_by_id

router = APIRouter()

@router.post("/")
async def post_image(file: UploadFile = File(...)):
    if not validate_image(file.filename):
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await file.read()
    image_id = store_image(file.filename, content)

    return {"message": "Image received", "image_id": str(image_id)}

@router.get("/{id}")
def get_image(id: str):
    image = get_image_by_id(id)
    return {"url": image["url"]}
