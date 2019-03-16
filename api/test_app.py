""" Tests post requests to flask server. """
import argparse

import requests

PyTorch_REST_API_URL = 'http://127.0.0.1:5000/predict'


def predict_result(image_path):
    image = open(image_path, 'rb').read()
    payload = {'image': image}

    # Submit the request.
    r = requests.post(PyTorch_REST_API_URL, data={'id': 1}, files=payload)
    r.raise_for_status()
    data = r.json()

    if data['success']:
        print(data['confidences'])

    print(data)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Classification demo')
    parser.add_argument('--file', type=str, help='test image file')

    args = parser.parse_args()
    predict_result(args.file)
