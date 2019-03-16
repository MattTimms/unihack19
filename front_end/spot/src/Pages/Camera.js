import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";

import PhotoCapture from "../Components/PhotoCapture";

class Camera extends Component {
  state = {};
  render() {
    return (
      <div>
        <PhotoCapture />
      </div>
    );
  }
}

export default Camera;
