import os
import time

import torch
from tqdm import tqdm


def train_model(model: torch.nn.Module, data_loader, n_epochs: int, criterion, scheduler, optimiser, device, logger,
                outf, dataset_len):
    best_model_wts = model.state_dict()
    best_acc = 0.0
    model.train()

    start_tm = time.time()
    for epoch in range(n_epochs):
        scheduler.step()

        losses = []  # losses per batch
        corrects = []  # ttl num of correct predictions per batch

        for images, labels in tqdm(data_loader):
            images, labels = images.to(device), labels.to(device)

            optimiser.zero_grad()  # zero parameter gradients (don't forget)
            outputs = model(images)
            if isinstance(outputs, tuple):
                outputs, _ = outputs

            # Calculate loss
            _, preds = torch.max(outputs.data, 1)  # idx of the max log-probability
            loss = criterion(outputs, labels)

            # Update network weights
            loss.backward()
            optimiser.step()

            # Log metrics
            losses.append(loss.data.item())
            corrects.append(preds.cpu().eq(labels.cpu()).sum().item())

        epoch_loss = sum(losses) / dataset_len
        epoch_acc = sum(corrects) / dataset_len

        log_data = {
            'Loss': epoch_loss,
            'Accuracy': epoch_acc,
        }
        logger.add_scalars("metrics", log_data, epoch)
        print("Loss: %2.3f\t Acc: %2.3f" % (epoch_loss, epoch_acc))

        if epoch_acc > best_acc:
            best_acc = epoch_acc
            best_model_wts = model.state_dict()
            torch.save(model.state_dict(), os.path.join(outf, 'weights.pth'))

        eval(model, data_loader, criterion, device, logger, dataset_len, epoch)

    finish_tm = time.time()
    print("Ttl time: %.2f\n"
          "Loss: %2.3f\t Acc: %2.3f" % ((finish_tm - start_tm), epoch_loss, epoch_acc))
    model.load_state_dict(best_model_wts)
    return model


def eval(model: torch.nn.Module, data_loader, criterion, device, logger, dataset_len, epoch):
    data_loader.dataset.eval()
    losses = []  # losses per batch
    corrects = []  # ttl num of correct predictions per batch

    for images, labels in tqdm(data_loader):
        images, labels = images.to(device), labels.to(device)

        outputs = model(images)
        if isinstance(outputs, tuple):
            outputs, _ = outputs

        # Calculate loss
        _, preds = torch.max(outputs.data, 1)  # idx of the max log-probability
        loss = criterion(outputs, labels)

        # Log metrics
        losses.append(loss.data.item())
        corrects.append(preds.cpu().eq(labels.cpu()).sum().item())

    epoch_loss = sum(losses) / dataset_len
    epoch_acc = sum(corrects) / dataset_len

    log_data = {
        'Eval_Loss': epoch_loss,
        'Eval_Accuracy': epoch_acc,
    }
    logger.add_scalars("metrics", log_data, epoch)
    print("Loss: %2.3f\t Acc: %2.3f" % (epoch_loss, epoch_acc))
    data_loader.dataset.train()
