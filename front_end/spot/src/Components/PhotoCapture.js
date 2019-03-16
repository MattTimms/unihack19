/*import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class PhotoCapture extends Component {
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

  onTakePhoto = dataUri => {
    const fd = new FormData();
    console.log(dataUri);
    var data = this.dataURItoBlob(dataUri);
    fd.append("image", data);
    //this.setState({ loading: true });
    this.props.uploadFunction(fd, dataUri);
  };

  render() {
    return (
      <div
        className="PhotoCapture"
        class="crop"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isFullScreen={true}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    );
  }
}

export default PhotoCapture;*/
