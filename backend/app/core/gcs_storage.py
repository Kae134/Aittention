from google.cloud import storage
from uuid import uuid4
import os
import mimetypes

BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")

client = storage.Client()
bucket = client.bucket(BUCKET_NAME)

def upload_image_to_gcs(filename: str, content: bytes) -> str:
    unique_name = f"{uuid4()}_{filename}"
    blob = bucket.blob(unique_name)

    content_type, _ = mimetypes.guess_type(filename)
    if content_type is None:
        content_type = "application/octet-stream"

    blob.upload_from_string(content, content_type=content_type)
    blob.make_public()

    return blob.public_url

def delete_image_from_gcs(gcs_url: str):
    blob_name = gcs_url.split("/")[-1]
    blob = bucket.blob(blob_name)
    blob.delete()
