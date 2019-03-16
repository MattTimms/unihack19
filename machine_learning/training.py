import torch
import time
from tqdm import tqdm


def train_model(model: torch.nn.Module, data_loader, n_epochs: int, criterion, scheduler, optimiser, device):
    best_model_wts = model.state_dict()
    best_acc = 0.0
    model.train()

    start_tim = time.time()
    for epoch in range(n_epochs):
        scheduler.step()

        losses = 0.0
        corrects = 0  # ttl num of correct predictions

        for images, labels in tqdm(data_loader):
            images, labels = images.to(device), labels.to(device)

            optimiser.zero_grad()  # zero parameter gradients (don't forget)
            outputs = model(images)

            # Calculate loss
            _, preds = torch.max(outputs.data, 1)  # idx of the max log-probability
            loss = criterion(outputs, labels)

            loss.backward()
            optimiser.step()
    return model