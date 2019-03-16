import torch
import torchvision.transforms as transforms
from torch.utils.data import Dataset


class CustomDataset(Dataset):
    def __init__(self, root_dir: str, testing: bool=False):
        self.root_dir = root_dir
        self.testing = testing

        # self._len =

        self.transforms = transforms.Compose([
            transforms.Resize(299),  # defined by the architecture
            transforms.CenterCrop(299),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # defined by the architecture
        ])

    def __len__(self):
        return self._len

    def __getitem__(self, idx):
        pass # todo
