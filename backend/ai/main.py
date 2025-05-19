import os
import argparse
import torch
import datetime
import tempfile
from net import SUM, load_and_preprocess_image, predict_saliency_map, overlay_heatmap_on_image, write_heatmap_to_image
from net.configs.config_setting import setting_config
from pymongo import MongoClient
import gridfs

def setup_model(device, model_path=None):
    """
    Still in work : 
        - make the code better
        - need to verify the connection between mongodb and the code
        - need to see the files organisation (main and inference are basicly the same)
        - talk with the team for the code without mongodb
        - try, update and correct the code as needed

    Used Claude ai to go faster on some task like basic mongodb connection
        - need to verify the clarity of the code (if needed, I passed quickly through it)
    """
    if model_path:
        model = SUM.from_pretrained(model_path).to(device)
        return model
    
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
        model.load_state_dict(torch.load('net/pre_trained_weights/sum_model.pth', map_location=device))
        model.to(device)
        return model
    else:
        raise NotImplementedError("The specified network configuration is not supported.")

def process_mongodb_image(
    image_id,
    mongodb_uri="mongodb://localhost:27017/",
    db_name="saliency_db",
    input_collection="images",
    output_collection="results",
    condition=2,
    model_path=None
):
    client = MongoClient(mongodb_uri)
    db = client[db_name]
    
    fs_input = gridfs.GridFS(db, collection=input_collection)
    fs_output = gridfs.GridFS(db, collection=output_collection)
    
    image_file = fs_input.get(image_id)
    if not image_file:
        raise ValueError(f"Image avec ID {image_id} non trouvée dans la collection {input_collection}")
    
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as temp_input:
        temp_input.write(image_file.read())
        temp_input_path = temp_input.name
    
    temp_hot_path = tempfile.NamedTemporaryFile(suffix='_saliencymap.png', delete=False).name
    temp_overlay_path = tempfile.NamedTemporaryFile(suffix='_overlay.png', delete=False).name
    
    try:
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        
        model = setup_model(device, model_path)
        
        img, orig_size = load_and_preprocess_image(temp_input_path)
        pred_saliency = predict_saliency_map(img, condition, model, device)
        
        write_heatmap_to_image(pred_saliency, orig_size, temp_hot_path)
        
        overlay_heatmap_on_image(temp_input_path, temp_hot_path, temp_overlay_path)
        
        simple_metadata = {
            "original_image_id": image_id,
            "condition": condition,
            "timestamp": datetime.datetime.now()
        }
        
        with open(temp_hot_path, 'rb') as heatmap_file:
            heatmap_id = fs_output.put(
                heatmap_file.read(),
                filename=f"saliencymap_{image_id}.png",
                metadata={"type": "heatmap", **simple_metadata}
            )
        
        with open(temp_overlay_path, 'rb') as overlay_file:
            overlay_id = fs_output.put(
                overlay_file.read(),
                filename=f"overlay_{image_id}.png",
                metadata={"type": "overlay", **simple_metadata}
            )
        
        return {
            "status": "success",
            "heatmap_id": heatmap_id,
            "overlay_id": overlay_id
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }
    finally:
        for filepath in [temp_input_path, temp_hot_path, temp_overlay_path]:
            if os.path.exists(filepath):
                os.unlink(filepath)
        
        client.close()

def main():
    parser = argparse.ArgumentParser(description='Saliency Map Prediction avec MongoDB')
    parser.add_argument('--image_id', type=str, required=True, help='ID de l\'image dans MongoDB')
    parser.add_argument('--mongodb_uri', type=str, default='mongodb://localhost:27017/', help='URI de connexion MongoDB')
    parser.add_argument('--db_name', type=str, default='saliency_db', help='Nom de la base de données')
    parser.add_argument('--input_collection', type=str, default='images', help='Collection contenant les images')
    parser.add_argument('--output_collection', type=str, default='results', help='Collection pour stocker les résultats')
    parser.add_argument('--condition', type=int, default=2, choices=[0, 1, 2, 3], help='Condition pour le modèle de saillance')
    parser.add_argument('--from_pretrained', type=str, help='Chemin vers un modèle pré-entraîné')
    
    args = parser.parse_args()
    
    result = process_mongodb_image(
        image_id=args.image_id,
        mongodb_uri=args.mongodb_uri,
        db_name=args.db_name,
        input_collection=args.input_collection,
        output_collection=args.output_collection,
        condition=args.condition,
        model_path=args.from_pretrained
    )
    
    print(f"Résultat du traitement: {result}")

if __name__ == "__main__":
    main()