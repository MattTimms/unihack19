import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Jumbotron, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
//import { Slider } from "material-ui-slider";
import Cropper from "react-easy-crop";
import ReactCrop from "react-image-crop";
import getCroppedImg from "../Components/cropImage.js";
class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.location.state.detail,
      imgForm: props.location.state.imgForm,
      crop: { x: 3, y: 2 },
      zoom: 1,
      aspect: 3 / 3,
      croppedAreaPixels: null,
      croppedImage: null
    };
  }

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({ croppedAreaPixels });
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  dataURItoBlob = dataURI => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  send = newImg => {
    const fd = new FormData();
    var data = this.dataURItoBlob(newImg);
    fd.append("image", data);
    fetch(
      "https://10.77.2.189:5000/predict",
      {
        method: "POST",
        body: fd
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
            imageData: newImg
          }
        });
      });
    });
  };
  sendCroppedImage = async () => {
    const croppedImage = await getCroppedImg(
      this.state.imgSrc,
      this.state.croppedAreaPixels
    ).then(response => {
      console.log(response);
      this.send(response);
    });
    this.setState({ croppedImage });
  };
  render() {
    //var image = JSON.parse(localStorage.getItem("Image"));
    //this.state.imgSrc = image;
    return (
      <div class="d-flex justify-content-center align-items-center column">
        {this.state.imgSrc && (
          <div
            className="crop-container row"
            style={{
              backgroundColor: "white",
              width: "300px",
              height: "300px"
            }}
          >
            <Cropper
              showGrid={false}
              image={this.state.imgSrc}
              class={"rotateimg90"}
              crop={this.state.crop}
              zoom={this.state.zoom}
              aspect={this.state.aspect}
              onCropChange={this.onCropChange}
              onCropComplete={this.onCropComplete}
              onZoomChange={this.onZoomChange}
            />
          </div>
        )}
        <Button
          onClick={this.sendCroppedImage}
          style={{
            backgroundColor: "red",
            position: "absolute",
            bottom: "20px"
          }}
          class={"row"}
        >
          Send
        </Button>
      </div>
    );
  }
}

export default Crop;
