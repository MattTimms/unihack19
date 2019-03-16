import argparse
import os
import datetime

import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data
from torch.optim import lr_scheduler
import torchvision.models as models
from tensorboardX import SummaryWriter

from machine_learning.data_loader import CustomDataset


# Argument parsing
parser = argparse.ArgumentParser()
CURR_PATH = os.path.dirname(os.path.realpath(__file__))  # todo maybe?
parser.add_argument('--dataroot', type=str, default='./../data/isic-skin/', help='path to dataset')
parser.add_argument('--eval', default=False, help='path to trained model *.pth for evaluation [default: False]')
parser.add_argument('--outf', default='./machine_learning/saved/runs/',
                    help='folder to output directory [default: ./machine_learning/saved/runs/]')
parser.add_argument('--cuda', action='store_true', help='enables CUDA usage')
parser.add_argument('--nworkers', type=int, help='number of data loading workers [default: 0]', default=0)
parser.add_argument('--niters', type=int, help='number of training epochs [default: 10]', default=10)
parser.add_argument('--batch_size', type=int, default=32, help='input batch size [default: 32]')


def main(args: argparse.Namespace):
    if args.eval:  # Testing
        pass # todo
    else:  # Training
        args.outf = os.path.join(args.outf, datetime.datetime.now().strftime('%Y%m%dT%H%M%S'))
        os.makedirs(args.outf)

    # Import dataset
    dataset = CustomDataset(dataset_root=args.dataroot, training=not args.eval)



if __name__ == '__main__':
    args = parser.parse_args()
    main(args)
