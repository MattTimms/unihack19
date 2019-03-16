import React, { Component } from "react";
import ReactDOM from "react-dom";

class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.location.state.detail
    };
  }
  render() {
    return (
      <div>
        <img
          style={{
            width: "500px",
            height: "500px",
            marginTop: "20px",
            transform: "rotate(90deg)"
          }}
          src={this.state.imgSrc}
        />
      </div>
    );
  }
}

export default Crop;
