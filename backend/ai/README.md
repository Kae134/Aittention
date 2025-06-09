# 🚀​ How to launch the ai

To launch the ai, you need to run on linux.

Install cuda 11.6 or later.

And then run these commands to install all the pytorch and the other libraries :

```bash
pip install torch==2.1.0 torchvision==0.16.0 torchaudio==2.1.0 --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt
```

Then download the **SUM** model from the Google Drive link and move it to the directory:

- [Download SUM model](https://drive.google.com/file/d/14ma_hLe8DrVNuHCSKoOz41Q-rB1Hbg6A/view?usp=drive_link): `sum_model.pth`
- Move `sum_model.pth` to: `net/pre_trained_weights`

## 🔧 To use it :

Call the main() in inference.py and put the following parameters :
- `img`: The data in bytes 
- `condition`: Condition index for generating the saliency map. Each number corresponds to a specific type of visual content:
  - `0`: Natural scenes based on the Salicon dataset (Mouse data).
  - `1`: Natural scenes (Eye-tracking data).
  - `2`: E-Commercial images.
  - `3`: User Interface (UI) images.
- `heat_map_type`: Type of heatmap to generate. Choose either `HOT` for a standalone heatmap or `Overlay` to overlay the heatmap on the original image.

By default, you only need to enter the image, the condition is set to 2 and the heat_map_type to Overlay.

The bytes of 2 images will be provided has a result. Or only 1 if HOT is selected.

# 👷​ Changes

- Change the main, going from args to direct function params
- Change the img locations, from path to bytes/binary and temporary files and the result was changed from locally store (like the import) and to binary for the upload
- Docker that install all the needed requirements and install all dependencies + link to the backend
- Modify some imports to run good with docker

# ​🚨 Difficulty Encountered

- Driver and toolkit installation (locally and in docker)
- Understanding of the code (never done ai before)
- Needed to modify the code for the good conversion (image, ... for our use cases)


## Source for the code and other
 - [SUM AI](https://github.com/Arhosseini77/SUM)
 - [Cuda installtion](https://medium.com/@juliuserictuliao/documentation-installing-cuda-on-ubuntu-22-04-2c5c411df843)
