from PIL import Image
from io import BytesIO

def validate_image(filename: str) -> bool:
    allowed = ["jpg", "jpeg", "png", "bmp"]
    return filename.split(".")[-1].lower() in allowed

def is_valid_image(content: bytes) -> bool:
    try:
        Image.open(BytesIO(content)).verify()
        return True
    except Exception:
        return False
