# File: app/routes/saliency_endpoint.py
from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from io import BytesIO
from bson.binary import Binary
from app.utils.image import validate_image
from app.core.storage import store_image

# Import de la fonction du modèle SUM depuis le fichier original
# Remplacez ce chemin par le vrai chemin dans votre structure de projet
from ai.inference import main, test

router = APIRouter()

@router.post("")
async def analyze_image_saliency(image: UploadFile = File(...)):
    """
    Endpoint qui analyse une image stockée dans MongoDB et génère une carte de saillance.
    L'image est toujours analysée avec condition=2 et heat_map_type=Overlay.
    
    Args:
        image_id: L'ID de l'image dans MongoDB
        
    Returns:
        Un dictionnaire contenant l'ID de l'image originale et l'ID de l'image avec overlay
    """

    if not validate_image(image.filename):
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = await image.read()

    store_image(image.filename, content)

    test = main(BytesIO(content))

    img1 = test["overlay_img"]
    buffer = BytesIO(img1)

    store_image(image.filename + "_overlay", Binary(img1))

    return StreamingResponse(
        buffer,
        media_type="image/jpeg",
        headers={"Content-Disposition": "inline; filename=heatmap.jpg"}
    )