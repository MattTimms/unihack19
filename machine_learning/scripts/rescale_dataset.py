""" Unmaintained script for rescaling ISIC dataset (isic is huge) """
import os

import torchvision.transforms as transforms
from PIL import Image

dir_path = os.path.dirname(os.path.realpath(__file__))
root_dir = os.path.join(dir_path, './../../../data/isic-skin/')
img_dir = os.path.join(root_dir, 'Images/')
out_dir = os.path.join(root_dir, 'Images_small')
os.makedirs(out_dir, exist_ok=True)

transforms = transforms.Compose([
    transforms.Resize(299),  # defined by the architecture
    transforms.CenterCrop(299),
])

img_filepaths = os.listdir(img_dir)
for i, fp in enumerate(img_filepaths):
    img_path = os.path.join(img_dir, fp)
    image = Image.open(img_path).convert('RGB')
    image = transforms(image)

    image.save(os.path.join(out_dir, fp))
    print('[%i/%i]' % (i, len(img_filepaths)))
