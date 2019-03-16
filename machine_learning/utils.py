import numpy as np
import torch


def unnormalise(tensor: torch.Tensor) -> np.array:
    """ Converts normalised CxHxW tensor to HxWxC numpy image. """
    tensor = tensor.cpu().detach()
    min, max = float(tensor.min()), float(tensor.max())
    tensor = tensor.clamp_(min=min, max=max)
    tensor = tensor.add_(-min).div_(max - min + 1e-5)
    image = tensor.mul(255).clamp(0, 255).byte().permute(1, 2, 0).numpy()
    if image.shape[-1] == 1:
        image = image.squeeze()
    return image


def print_architecture(model: torch.nn.Module):
    for name, child in model.named_children():
        for name2, params in child.named_parameters():
            print(name, name2, 'trainable=%r' % params.requires_grad)
