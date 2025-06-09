from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from app.utils.image import validate_image
from app.core.storage import store_image, get_image_by_id, get_user_images
from io import BytesIO

router = APIRouter()

@router.post("")
async def post_image(file: UploadFile = File(...)):
    if not validate_image(file.filename):
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await file.read()
    image_id = store_image(file.filename, content)

    return {"message": "Image received", "image_id": str(image_id)}

@router.get("/{id}")
def get_image(id: str):
    image = get_image_by_id(id)

    content = image["data"]
    filename = image["filename"]

    return StreamingResponse(
        BytesIO(content),
        media_type="image/jpeg",
        headers={"Content-Disposition": f"inline; filename={filename}"}
    )

@router.get("/users/{user_id}/images")
def list_user_images(
        user_id: str
    ):

    images = get_user_images(user_id)

    return images
