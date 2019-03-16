import os
import json

import torch
import torchvision.transforms as transforms
from torch.utils.data import Dataset
from PIL import Image


class CustomDataset(Dataset):
    label_key = {
        'benign': 0,
        'malignant': 1,
        'other': 2,
    }

    def __init__(self, root_dir: str, testing: bool=False):
        self.root_dir = root_dir
        self.testing = testing

        self.dir_images = os.path.join(root_dir, 'Images')
        self.dir_descript = os.path.join(root_dir, 'Descriptions')

        if not os.path.exists(self.dir_images) or not os.path.exists(self.dir_descript):
            raise Exception(f"Cannot find Images/ or Descriptions/ in {root_dir}")  # todo custom exception

        self.dataset_file_list = os.listdir(self.dir_descript)
        self._len = len(self.dataset_file_list)

        self.transforms = transforms.Compose([
            transforms.Resize(299),  # defined by the architecture
            transforms.CenterCrop(299),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # defined by the architecture
        ])

    def __len__(self):
        return self._len

    def __getitem__(self, idx):
        # idx -= 1  # starting at 0 offset  # todo maybe not needed
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


if __name__ == '__main__':
    dir_path = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.join(dir_path, './../../data/isic-skin/')
    dataset = CustomDataset(root_dir)
    length = len(dataset)

    dataloader = torch.utils.data.DataLoader(dataset, shuffle=True)
    img, label = next(iter(dataloader))

    from machine_learning.utils import unnormalise
    import cv2
    img_unnorm = unnormalise(img.squeeze(0))[:, : ,-1]  # don't forget about PIL - cv2 images data formatting
    cv2.imshow("img", img_unnorm)
    cv2.waitKey()

    print(1)
