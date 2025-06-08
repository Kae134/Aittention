from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
from io import BytesIO
from typing import Optional
from bson.binary import Binary
from app.utils.image import validate_image
from app.core.storage import store_image
from app.core.auth_deps import optional_auth

from ai.inference import main

router = APIRouter()

@router.post("")
async def analyze_image_saliency(
    image: UploadFile = File(...),
    current_user: Optional[dict] = Depends(optional_auth)
    ):

    content = await image.read()
    
    if not validate_image(image.filename):
        raise HTTPException(status_code=400, detail="Invalid image type")
    
    image_data = main(BytesIO(content))
    image_treated = image_data["overlay_img"]
    buffer = BytesIO(image_treated)

    if current_user :
        store_image(image.filename, content)
        store_image(image.filename + "_overlay", Binary(image_treated), current_user["user_id"])

    
    return StreamingResponse(
        buffer,
        media_type="image/jpeg",
        headers={"Content-Disposition": "inline; filename=heatmap.jpg"}
    )