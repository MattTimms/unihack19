import json
import os

import pandas as pd
import torch
import torchvision.transforms as transforms
from PIL import Image
from torch.utils.data import Dataset


class DatasetNotFound(Exception):
    pass


class CustomDataset(Dataset):
    label_key = {
        'benign': 0,
        'malignant': 1,
        'other': 2,  # todo there is no other...
    }
    n_classes = len(label_key)

    # Specific to use of the InceptionV3 model architecture
    transforms = transforms.Compose([
        transforms.Resize(299),  # defined by the architecture
        transforms.CenterCrop(299),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # defined by the architecture
    ])

    def __init__(self, root_dir: str, testing: bool = False):
        self.root_dir = root_dir
        self.testing = testing

        self.dir_images = os.path.join(root_dir, 'Images')
        self.dir_descript = os.path.join(root_dir, 'Descriptions')

        if not os.path.exists(self.dir_images) or not os.path.exists(self.dir_descript):
            raise DatasetNotFound(f"Cannot find Images/ or Descriptions/ in {root_dir}")

        self.dataset_file_list = os.listdir(self.dir_descript)
        self._len = len(self.dataset_file_list)

    def __len__(self):
        return self._len

    def __getitem__(self, idx):
        sample_name = self.dataset_file_list[idx]

        desc_path = os.path.join(self.dir_descript, sample_name)
        img_path = os.path.join(self.dir_images, sample_name + '.jpeg')
        if not os.path.exists(img_path):
            img_path = os.path.join(self.dir_images, sample_name + '.png')

        image = Image.open(img_path).convert('RGB')
        if self.transforms:
            image = self.transforms(image)

        # Load meta
        with open(desc_path, 'r') as stream:
            meta = json.load(stream)
        label_class = meta['meta']['clinical']['benign_malignant']
        label = self.label_key[label_class]

        return image, label


class HamDataset(Dataset):
    label_key = {
        'nv': ('Melanocytic nevi', 0),
        'mel': ('Melanoma', 1),
        'bkl': ('Benign keratosis-like lesions', 2),
        'bcc': ('Basal cell carcinoma', 3),
        'akiec': ('Actinic keratoses', 4),
        'vasc': ('Vascular lesions', 5),
        'df': ('Dermatofibroma', 6),
    }
    n_classes = len(label_key)

    # Specific to use of the InceptionV3 model architecture
    transforms = transforms.Compose([
        transforms.Resize(299),  # defined by the architecture
        transforms.CenterCrop(299),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # defined by the architecture
    ])

    def __init__(self, root_dir: str, testing: bool = False):
        self.root_dir = root_dir
        self.testing = testing

        self.path_csv = os.path.join(root_dir, 'HAM10000_metadata.csv')
        self.dir_images_1 = os.path.join(root_dir, 'HAM10000_images_part_1')
        self.dir_images_2 = os.path.join(root_dir, 'HAM10000_images_part_2')

        if not all([os.path.exists(path) for path in [self.path_csv, self.dir_images_1, self.dir_images_2]]):
            raise DatasetNotFound(f"Cannot find HAM10000_metadata.csv or HAM10000_images_part_*/ in {root_dir}")

        self.meta_frame = pd.read_csv(self.path_csv)

    def __len__(self):
        return len(self.meta_frame)

    def __getitem__(self, idx):
        sample_name = self.meta_frame.iloc[idx, 1] + '.jpg'
        img_path = os.path.join(self.dir_images_1, sample_name)
        if not os.path.exists(img_path):
            img_path = os.path.join(self.dir_images_2, sample_name)

        image = Image.open(img_path).convert('RGB')
        if self.transforms:
            image = self.transforms(image)

        # Load meta
        meta = self.meta_frame.iloc[idx, :].drop('image_id').values.tolist()
        label = self.label_key[meta[1]][1]

        return image, label


if __name__ == '__main__':
    dir_path = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.join(dir_path, './../../data/isic-skin/')
    dataset = CustomDataset(root_dir)
    length = len(dataset)

    dataloader = torch.utils.data.DataLoader(dataset, shuffle=True)
    img, label = next(iter(dataloader))

    from machine_learning.utils import unnormalise
    import cv2

    img_unnorm = unnormalise(img.squeeze(0))[:, :, -1]  # don't forget about PIL - cv2 images data formatting
    cv2.imshow("img", img_unnorm)
    cv2.waitKey()

    print(1)
