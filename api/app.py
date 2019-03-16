import base64
import io

import cv2
import flask
import numpy as np
import torch
import torch.nn as nn
import torchvision.models as models
from PIL import Image
from torch.nn import functional as F

from machine_learning.data_loader import CustomDataset

HOST = '127.0.0.1'
PORT = 5000

app = flask.Flask(__name__)
model = None
use_gpu = True and torch.cuda.is_available()
device = torch.device('cuda:0') if use_gpu else torch.device('cpu')

# Import data/model information
label_key = CustomDataset.label_key
n_classes = CustomDataset.n_classes
transforms = CustomDataset.transforms


def load_model():
    global model
    model = models.inception_v3(pretrained=True)

    # Freeze all layers
    for params in model.parameters():
        params.requires_grad = False

    # Replace final layer
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, n_classes)

    # Load state of model
    # model.load_state_dict(torch.load('model/weights.pth', map_location=device))  # todo get weights
    model.eval()

    # Cast to CPU/GPU
    model.to(device)


def prepare_image(image: Image.Image) -> torch.Tensor:
    if image.mode != 'RGB':
        image = image.convert("RGB")

    image = transforms(image)

    image = image.unsqueeze(0)  # Add batch_size axis.
    return image.to(device)  # 1xCxHxW tensor.


def _encode_image_array(array: np.array) -> str:
    success, encoded_image = cv2.imencode('.png', array)
    encoded_image_bytes = encoded_image.tobytes()
    return base64.b64encode(encoded_image_bytes).decode('utf-8')


def _decode_image_array(encoded_image_str: str) -> np.array:
    img_bytes = io.BytesIO(base64.b64decode(encoded_image_str))
    return np.array(Image.open(img_bytes))


@app.route("/predict", methods=["POST"])
def predict():
    data = {"success": False}

    if flask.request.method == 'POST':
        if flask.request.files.get("image"):
            # Read the image in PIL format
            image = flask.request.files["image"].read()
            image = Image.open(io.BytesIO(image)).convert('RGB')

            # temp0 = np.array(image)[:, :, ::-1]
            # cv2.imshow("temp", temp0)
            # cv2.waitKey()

            # Preprocess the image
            image = prepare_image(image)

            # temp1 = unnormalise(image.squeeze(0))[:, :, ::-1]
            # cv2.imshow("temp1", temp1)
            # cv2.waitKey()
            # cv2.destroyAllWindows()

            # forward pass
            outputs = model(image)
            outputs = F.softmax(outputs)
            pred = outputs.squeeze(0).detach().cpu().numpy()

            data['confidences'] = {key: pred[idx].item() for key, idx in label_key.items()}
            data["success"] = True

    return flask.jsonify(data)


if __name__ == '__main__':
    print("Loading PyTorch model and Flask starting server ..."
          "Please wait until server has fully started")
    load_model()
    app.run(host=HOST, port=PORT)
