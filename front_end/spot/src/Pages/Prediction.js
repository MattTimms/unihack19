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
      maxValues: maximum,
      imgSrc: props.location.state.imageData
    };
  }
  saveEntry = () => {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    var time = d + "/" + m + "/" + y;
    var entry = {
      date: time,
      percentage: this.state.maxValues[0].toFixed(2) * 100,
      image: this.state.imgSrc
    };
    localStorage.setItem("Entry", JSON.stringify(entry));
    var test = JSON.parse(localStorage.getItem("Entry"));
    this.props.history.push({
      pathname: "/SaveSelect",
      search: "query=abc",
      state: {
        detail: entry
      }
    });
  };

  pressed = type => {
    console.log(type);
    this.props.history.push({
      pathname: "/Camera/ExtraInfo",
      search: "query=abc",
      state: {
        detail: type
      }
    });
  };
  render() {
    return (
      <div
        class="column"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <img
          style={{
            marginTop: "20px",
            width: "160px",
            height: "160px"
          }}
          src={this.state.imgSrc}
        />
        <h2>{this.state.maxValues[0].toFixed(2) * 100}%</h2>
        <div
          style={{
            direction: "flex",
            justifyContent: "center",
            height: "100px"
          }}
        >
          <div class="btn-group-vertical row">
            <Button
              class="btn btn-primary"
              style={{ backgroundColor: "#4c4c4c" }}
              onClick={() => this.pressed("Meaning")}
            >
              What does this mean?
            </Button>
            <Button
              class="btn btn-primary"
              style={{ backgroundColor: "#707070" }}
              onClick={() => this.pressed("Action")}
            >
              What can I do?
            </Button>
            <Button
              class="btn btn-primary"
              style={{ backgroundColor: "#4c4c4c" }}
              onClick={() => this.pressed("How")}
            >
              How were these results calculated
            </Button>
          </div>
          <div class="row" style={{ width: "100%" }}>
            <Link
              to="/"
              style={{
                marginTop: "10px",
                direction: "flex",
                justifyContent: "center"
              }}
            >
              <Button color="primary">Re-take</Button>
            </Link>
            <Button
              onClick={this.saveEntry}
              color="primary"
              style={{ position: "absolute", right: "20px" }}
            >
              Save Entry
            </Button>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Prediction;
