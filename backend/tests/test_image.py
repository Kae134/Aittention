import pytest
from app.utils.image import validate_image, is_valid_image

def test_validate_image_type():
    assert validate_image("photo.jpg") is True
    assert validate_image("photo.exe") is False

def test_is_valid_image_valid():
    with open("tests/sample.jpg", "rb") as f:
        content = f.read()
        assert is_valid_image(content)

def test_is_valid_image_invalid():
    fake = b"not an image"
    assert is_valid_image(fake) is False
