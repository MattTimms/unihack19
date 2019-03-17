import React, { Component } from "react";
import ReactDOM from "react-dom";

import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Jumbotron, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import camera from "../img/camera-outline.svg";

import Header from "../Components/Header.js";

const days = 0;
const required = 14;
const percentage = Math.round((2 / 3) * 100);

class Home extends Component {
  state = {};
  render() {
    return this.renderPage();
  }
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }
  addPhoto = event => {
    const fd = new FormData();
    var imgSource = URL.createObjectURL(event.target.files[0]);
    this.setState({ imgSRC: imgSource });

    fd.append("image", event.target.files[0], event.target.files[0].name);
    var img = JSON.parse(localStorage.getItem("Image"));
    if (img != null) {
      this.setState({ imgSrc: img });
    }
    var idCard = event.target.files[0];
    let idCardBase64 = "";
    console.log(Date());
    this.getBase64(idCard, result => {
      idCardBase64 = result;
      //localStorage.setItem("Image", JSON.stringify(result));
      this.props.history.push({
        pathname: "/Crop",
        search: "query=abc",
        state: {
          detail: result
        }
      });
    });
  };
  renderPage = () => {
    return (
      <div style={{ backgroundColor: "white" }}>
        <Header currentSpot={"Home"} />
        <div>
          <h1 className="display-2" style={{ fontSize: "73px" }}>
            Hello
          </h1>
          <h1 className="display-2" style={{ fontSize: "73px" }}>
            Emma,
          </h1>
        </div>

        <div class="d-flex justify-content-center">
          <CircularProgressbar
            percentage={percentage}
            text={`${required - days}`}
            background
            backgroundPadding={5}
            initialAnimation
            styles={{
              background: {
                fill: "53d769"
              },
              text: {
                fill: "#fff",
                fontSize: "30px"
              },
              path: {
                stroke: "#fff"
              },
              trail: { stroke: "transparent" }
            }}
          />
        </div>

        <div>
          <h3
            style={{
              fontSize: "25px",
              fontFamily: "Gill Sans",
              color: "#53d769",
              textAlign: "center"
            }}
          >
            Days since self-check
          </h3>
        </div>

        <div id="footer" class="d-flex justify-content-left">
          <div id="c1">
            <Link to="Analytics">
              <Button
                size="lg"
                block
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <img src="https://img.icons8.com/pastel-glyph/64/000000/financial-analytics.png" />
              </Button>
            </Link>
          </div>

          <div id="c2">
            <label
              for="inputFile"
              className="d-flex justify-content-center"
              size="lg"
              block
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                border: "none"
              }}
            >
              <img src="https://img.icons8.com/ios/64/000000/screenshot.png" />
              <div
                class="btn btn-primary"
                style={{ backgroundColor: "transparent", border: "none" }}
              />
            </label>
          </div>

          <div id="c3">
            <div class="center">
              <Button
                onClick={() => {
                  this.props.history.push({
                    pathname: "/ExtraInfo",
                    search: "query=abc",
                    state: {
                      detail: "How"
                    }
                  });
                }}
                size="lg"
                block
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <img src="https://img.icons8.com/pastel-glyph/64/000000/health-book.png" />
              </Button>
            </div>
          </div>
        </div>
        <input
          id="inputFile"
          type="file"
          accept="image/*"
          capture
          hidden
          onChange={this.addPhoto}
        />
      </div>
    );
  };
}

//Self care = Prediction

export default Home;
