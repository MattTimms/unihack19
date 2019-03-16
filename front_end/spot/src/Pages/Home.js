import React, { Component } from "react";
import ReactDOM from "react-dom";

import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Jumbotron, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const percentage = 66;
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
      <div>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-4">Hello</h1>
              <h1 className="display-4">Emma,</h1>
              <p className="lead">What would you like to do today?</p>
            </Container>
          </Jumbotron>
        </div>

        <div class="d-flex justify-content-center">
          <CircularProgressbar
            percentage={percentage}
            text={`${percentage}%`}
            background
            backgroundPadding={6}
            initialAnimation
            styles={{
              background: {
                fill: "#865CD6"
              },
              text: {
                fill: "#fff"
              },
              path: {
                stroke: "#fff"
              },
              trail: { stroke: "transparent" }
            }}
          />
        </div>

        <div id="footer" class="d-flex justify-content-left">
          <div id="c1">
            <Link to="Analytics">
              <Button color="primary" size="lg">
                <i class="fas fa-chart-line fa-3x" />
              </Button>
            </Link>
          </div>
          <div id="c2">
            <label for="inputFile" className="d-flex justify-content-center">
              <div class="btn btn-danger">
                <i class="fas fa-camera fa-3x" />
              </div>
            </label>
          </div>

          <div id="c3">
            <Link to="Self Care">
              <Button color="warning" size="lg">
                <i class="fas fa-notes-medical fa-3x" />
              </Button>
            </Link>
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
