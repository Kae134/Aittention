import io
from PIL import Image
import torchvision.transforms as transforms
import torch
import numpy as np
import cv2
import matplotlib.pyplot as plt


def load_and_preprocess_image(img_path):
    image = Image.open(img_path).convert("RGB")
    orig_size = image.size
    transform = transforms.Compose(
        [
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )
    image = transform(image)
    return image, orig_size


def predict_saliency_map(img, condition, model, device):
    img = img.unsqueeze(0).to(device)
    one_hot_condition = torch.zeros((1, 4), device=device)
    one_hot_condition[0, condition] = 1
    model.eval()
    with torch.no_grad():
        pred_saliency = model(img, one_hot_condition)

    pred_saliency = pred_saliency.squeeze().cpu().numpy()
    return pred_saliency


def overlay_heatmap_on_image(original_img, heatmap_img):
    # Read the original image
    img_array = np.frombuffer(original_img, dtype=np.uint8)
    orig_image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    orig_size = orig_image.shape[:2]  # Height, Width

    # Read the heatmap image
    overlay_heatmap_array = np.frombuffer(heatmap_img, dtype=np.uint8)
    overlay_heatmap = cv2.imdecode(overlay_heatmap_array, cv2.IMREAD_GRAYSCALE)

    # Resize the heatmap to match the original image size
    overlay_heatmap = cv2.resize(overlay_heatmap, (orig_size[1], orig_size[0]))

    # Apply color map to the heatmap
    overlay_heatmap = cv2.applyColorMap(overlay_heatmap, cv2.COLORMAP_JET)

    # Overlay the heatmap on the original image
    overlay_image = cv2.addWeighted(orig_image, 1, overlay_heatmap, 0.8, 0)

    # Save the result
    _, img_encoded = cv2.imencode(".jpg", overlay_image)
    img_bytes = img_encoded.tobytes()

    return img_bytes



def write_heatmap_to_image(heatmap, orig_size):
    plt.figure()
    plt.imshow(heatmap, cmap="hot")
    plt.axis("off")

    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight", pad_inches=0)
    buf.seek(0)
    plt.close()

    img = Image.open(buf)
    img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGBA2BGR)
    img_resized = cv2.resize(img_cv, orig_size, interpolation=cv2.INTER_AREA)   
    _, img_encoded = cv2.imencode(".jpg", img_resized)
    img_bytes = img_encoded.tobytes()
    return img_bytes

