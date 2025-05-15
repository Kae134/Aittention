# How to launch the ai

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

## To use it :

You can use command line :
```bash
python inference.py --img_path /path/to/your/image.jpg --condition [0, 1, 2, 3] --output_path /path/to/output --heat_map_type [HOT, Overlay]
```

or, when finished use the function that'll be provided

## Source for the code and other
 - [SUM AI](https://github.com/Arhosseini77/SUM)
 - [Cuda installtion](https://medium.com/@juliuserictuliao/documentation-installing-cuda-on-ubuntu-22-04-2c5c411df843)