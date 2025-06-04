from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
from io import BytesIO
from bson.binary import Binary
from app.utils.image import validate_image
from app.core.storage import store_image
from app.core.auth_deps import require_auth

from ai.inference import main

router = APIRouter()

@router.post("")
async def analyze_image_saliency(image: UploadFile = File(...)
, current_user: dict = Depends(require_auth)
):

    if not current_user :
        raise HTTPException(status_code=403, detail="Access denied")

    if not validate_image(image.filename):
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await image.read()

    store_image(image.filename, content)

    image_data = main(BytesIO(content))

    print(current_user)

    image_treated = image_data["overlay_img"]
    buffer = BytesIO(image_treated)

    store_image(image.filename + "_overlay", Binary(image_treated), current_user["user_id"])

    return StreamingResponse(
        buffer,
        media_type="image/jpeg",
        headers={"Content-Disposition": "inline; filename=heatmap.jpg"}
    )