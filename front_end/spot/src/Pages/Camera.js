import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";

import PhotoCapture from "../Components/PhotoCapture";
import Cropper from "react-easy-crop";

import "../App.css";
class Camera extends Component {
  addPhoto = event => {
    const fd = new FormData();
    var imgSource = URL.createObjectURL(event.target.files[0]);
    this.setState({ imgSRC: imgSource });

    fd.append("image", event.target.files[0], event.target.files[0].name);
    this.uploadPhoto(fd, imgSource);
  };

  uploadPhoto = (data, imgSource) => {
    fetch(
      "https://10.77.2.189:5000/predict",
      {
        method: "POST",
        body: data
      },
      {
        agent: new require("https").Agent({
          rejectUnauthorized: false
        })
      }
    ).then(response => {
      response.json().then(body => {
        console.log(body);
        this.props.history.push({
          pathname: "/Camera/Prediction",
          search: "query=abc",
          state: {
            detail: body.confidences,
            imageData: imgSource
          }
        });
      });
    });
  };
  state = {};
  render() {
    return (
      <div>
        <PhotoCapture uploadFunction={this.uploadPhoto} />
        <input
          id="inputFile"
          type="file"
          accept="image/*"
          hidden
          onChange={this.addPhoto}
        />
        <label
          for="inputFile"
          className="d-flex justify-content-center"
          style={{ width: "100%", height: "100%" }}
        >
          <div class="btn btn-primary">Upload</div>
        </label>
      </div>
    );
  }
}

export default Camera;
