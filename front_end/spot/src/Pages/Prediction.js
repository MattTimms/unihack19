import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header.js";

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
class Prediction extends Component {
  constructor(props) {
    super(props);
    var maximum = [0, null];
    var malignant = 0;
    var dataArray = props.location.state.detail;
    if (dataArray["success"] == true) {
      var confidences = dataArray.confidences;
      var malignant = 0;
      Object.keys(confidences).forEach(function(key) {
        if (confidences[key] > maximum[0]) {
          maximum[0] = confidences[key];
          maximum[1] = key;
          malignant = confidences["malignant"];
        }
      });
    } else {
      maximum[1] = "other";
      maximum[0] = "1";
    }

    this.state = {
      maxValues: maximum,
      imgSrc: props.location.state.imageData,
      malig: malignant
    };
  }
  saveEntry = () => {
    var n = new Date();
    var y = n.getFullYear() - 2000;
    var m = n.getMonth();
    var d = n.getDate();
    var time = d + "-" + months[m] + "-" + y;
    var entry = {
      date: time,
      percentage: this.state.malig.toFixed(2) * 100,
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
      pathname: "/ExtraInfo",
      search: "query=abc",
      state: {
        detail: type
      }
    });
  };

  render = () => {
    var out = null;
    console.log(this.state.maxValues[1]);
    if (this.state.maxValues[1] == "benign") {
      console.log("benign");
      out = (
        <p>
          Your freckle appears similar to others that was evaluated as benign by
          medical professionals
        </p>
      );
    } else if (this.state.maxValues[1] == "malignant") {
      console.log("malignant");
      out = (
        <p>
          Your freckle appears {this.state.maxValues[0].toFixed(2) * 100}%
          similar to other who sought out medical advice
        </p>
      );
    } else {
      console.log("other");
      out = (
        <p>
          The image quality is too poor for the neural network to detect a
          freckle. Please ensure the freckle is in frame and in focus.
        </p>
      );
    }
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
        <Header currentSpot={"Prediction"} />
        <img
          style={{
            marginTop: "20px",
            width: "160px",
            height: "160px"
          }}
          src={this.state.imgSrc}
        />
        {out}
        <div
          style={{
            direction: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px"
          }}
        >
          <div
            class="btn-group-vertical row"
            style={{
              direction: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px"
            }}
          >
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
          <div class="btn-group row" role="group" aria-label="Basic example">
            <button
              type="button"
              onClick={() => {
                this.props.history.push({
                  pathname: "/",
                  search: "query=abc",
                  state: {}
                });
              }}
              class="btn btn-secondary"
            >
              Re-take
            </button>
            <button
              type="button"
              onClick={this.saveEntry}
              class="btn btn-secondary"
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default Prediction;
