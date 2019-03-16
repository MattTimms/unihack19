import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Jumbotron, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.location.state.detail,
      imgForm: props.location.state.imgForm
    };
  }
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

  send = () => {
    const fd = new FormData();
    var data = this.dataURItoBlob(this.state.imgSrc);
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
            imageData: this.state.imgSrc
          }
        });
      });
    });
  };
  render() {
    //var image = JSON.parse(localStorage.getItem("Image"));
    //this.state.imgSrc = image;
    return (
      <div>
        <img
          style={{
            width: "300px",
            height: "300px",
            marginTop: "20px",
            transform: "rotate(90deg)"
          }}
          src={this.state.imgSrc}
        />
        <Button onClick={this.send} style={{ backgroundColor: "red" }}>
          Send
        </Button>
      </div>
    );
  }
}

export default Crop;
