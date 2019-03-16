import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Prediction extends Component {
  constructor(props) {
    super(props);
    var maximum = [0, null];
    var confidences = props.location.state.detail;
    Object.keys(confidences).forEach(function(key) {
      if (confidences[key] > maximum[0]) {
        maximum[0] = confidences[key];
        maximum[1] = key;
      }
    });
    this.state = {
      maxValues: maximum
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.maxValues[1]}</h2>
      </div>
    );
  }
}

export default Prediction;
