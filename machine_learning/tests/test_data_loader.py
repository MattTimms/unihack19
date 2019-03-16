import os

import cv2
import pytest
import torch

from machine_learning.data_loader import CustomDataset, HamDataset
from machine_learning.utils import unnormalise

DIR_PATH = os.path.dirname(os.path.realpath(__file__))


def test_custom_dataset():
    root_dir = os.path.join(DIR_PATH, './../../../data/isic-skin/')
    dataset = CustomDataset(root_dir)
    length = len(dataset)

    dataloader = torch.utils.data.DataLoader(dataset, shuffle=True)
    img, label = next(iter(dataloader))

    img_unnorm = unnormalise(img.squeeze(0))[:, :, -1]  # don't forget about PIL - cv2 images data formatting
    cv2.imshow("img", img_unnorm)
    cv2.waitKey()

    assert 1


def test_ham_dataset():
    root_dir = os.path.join(DIR_PATH, './../../../data/skin-cancer-mnist-ham10000/')
    dataset = HamDataset(root_dir)
    length = len(dataset)

    dataloader = torch.utils.data.DataLoader(dataset, shuffle=True)
    img, label = next(iter(dataloader))

    img_unnorm = unnormalise(img.squeeze(0))[:, :, -1]  # don't forget about PIL - cv2 images data formatting
    cv2.imshow("img", img_unnorm)
    cv2.waitKey()

    assert 1


if __name__ == '__main__':
    pytest.main()
