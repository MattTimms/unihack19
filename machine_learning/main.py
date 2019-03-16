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
from machine_learning.training import train_model
from machine_learning.utils import print_architecture

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

    # Initialise logger
    logger = SummaryWriter(args.outf)

    # Import dataset
    dataset = CustomDataset(root_dir=args.dataroot, testing=bool(args.eval))
    dataloader = torch.utils.data.DataLoader(dataset, batch_size=args.batch_size, shuffle=True,
                                             num_workers=args.nworkers)

    # Import model
    model = models.inception_v3(pretrained=True)  # Load InceptionV3 network

    for params in model.parameters():
        params.requires_grad = False
    ct = []
    for name, child in model.named_children():
        if "Conv2d_4a_3x3" in ct:
            for params in child.parameters():
                params.requires_grad = True
        ct.append(name)

    # Replace final layer
    n_class = dataset.n_classes
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, n_class)

    print_architecture(model)  # dbg

    # Specify CPU/GPU
    args.cuda = args.cuda and torch.cuda.is_available()
    device = torch.device("cuda:0") if args.cuda else torch.device("cpu")
    print("Device type:", device)
    model.to(device)

    # Training parameters
    criterion = nn.CrossEntropyLoss()
    optimiser = optim.SGD(list(filter(lambda p: p.requires_grad, model.parameters())), lr=0.001, momentum=0.9)
    scheduler = lr_scheduler.StepLR(optimiser, step_size=7, gamma=0.1)

    # Training
    train_model(model, dataloader, args.niters, criterion, scheduler, optimiser, device, logger, args.outf)



if __name__ == '__main__':
    args = parser.parse_args()
    main(args)
