import os
import argparse
import torch


from ai.net import SUM, load_and_preprocess_image, predict_saliency_map, overlay_heatmap_on_image, write_heatmap_to_image
from ai.net.configs.config_setting import setting_config


def setup_model(device):
    config = setting_config
    model_cfg = config.model_config
    if config.network == 'sum':
        model = SUM(
            num_classes=model_cfg['num_classes'],
            input_channels=model_cfg['input_channels'],
            depths=model_cfg['depths'],
            depths_decoder=model_cfg['depths_decoder'],
            drop_path_rate=model_cfg['drop_path_rate'],
        )
        model.load_state_dict(torch.load('ai/net/pre_trained_weights/sum_model.pth', map_location=device))
        model.to(device)
        return model
    else:
        raise NotImplementedError("The specified network configuration is not supported.")

def test():
    return "Hello"

def main(original_img, condition:int = 2, heat_map_type:str = "Overlay",):
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = setup_model(device)

    img, orig_size = load_and_preprocess_image(original_img)
    pred_saliency = predict_saliency_map(img, condition, model, device)

    heatmap_image = write_heatmap_to_image(pred_saliency, orig_size)
    print("Image received")

    if heat_map_type == 'Overlay':
        overlay_img = overlay_heatmap_on_image(original_img.getvalue(), heatmap_image)
    
    return {"heatmap": heatmap_image, "overlay_img": overlay_img}

if __name__ == "__main__":
    main()
