import os
import time

import torch
from tqdm import tqdm


def train_model(model: torch.nn.Module, data_loader, n_epochs: int, criterion, scheduler, optimiser, device, logger,
                outf):
    best_model_wts = model.state_dict()
    dataset_len = len(data_loader)  # todo check value
    best_acc = 0.0
    model.train()

    start_tim = time.time()
    for epoch in range(n_epochs):
        scheduler.step()

        losses = []  # losses per batch
        corrects = []  # ttl num of correct predictions per batch

        for images, labels in tqdm(data_loader):
            images, labels = images.to(device), labels.to(device)

            optimiser.zero_grad()  # zero parameter gradients (don't forget)
            outputs = model(images)

            # Calculate loss
            _, preds = torch.max(outputs.data, 1)  # idx of the max log-probability
            loss = criterion(outputs, labels)

            # Update network weights
            loss.backward()
            optimiser.step()

            # Log metrics
            losses += loss.data.item()
            corrects += preds.cpu().eq(labels.cpu()).sum().item()

        epoch_loss = sum(loss) / dataset_len
        epoch_acc = sum(corrects) / dataset_len

        log_data = {
            'Loss': epoch_loss,
            'Accuracy': epoch_acc,
            'lr': optimiser.param_groups[0]['lr']
        }
        logger.add_scalars("metrics", log_data, epoch)

        if epoch_acc > best_acc:
            best_acc = epoch_acc
            best_model_wts = model.state_dict()
            torch.save(model.state_dict(), os.path.join(outf, 'weights.pth'))

    model.load_state_dict(best_model_wts)
    return model