""" Tests post requests to flask server. """
import argparse

import requests

from api.app import HOST, PORT

ENDPOINT = f'http://{HOST}:{PORT}/predict'


def predict_result(image_path):
    image = open(image_path, 'rb').read()
    payload = {'image': image}

    r = requests.post(ENDPOINT, data={}, files=payload)
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
