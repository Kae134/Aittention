import io
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_valid_image_upload():
    # Crée une image PNG valide simulé
    image_content = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR" + b"\x00" * 100
    response = client.post(
        "/api/v1/analyze/upload/",
        files={"file": ("test.png", image_content, "image/png")},
    )
    assert response.status_code == 200
    assert "image_id" in response.json()

def test_invalid_file_upload():
    # Envoie un faux fichier texte
    response = client.post(
        "/api/v1/analyze/upload/",
        files={"file": ("test.txt", b"not an image", "text/plain")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "File is not a valid image"
