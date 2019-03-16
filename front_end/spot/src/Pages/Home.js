import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class Home extends Component {
  state = { test: "nope" };
  render() {
    return this.renderPage();
  }
  storeData = () => {
    console.log("test");
    console.log(localStorage.getItem("myData"));
    if (localStorage.getItem("myData") != null) {
      this.setState({ test: "test" });
    }
    localStorage.setItem("myData", "testing");
  };
  renderPage = () => {
    return (
      <div class="d-flex justify-content-center">
        <Link to="Analytics">
          <Button color="primary">Analytics</Button>
        </Link>
        <Button onClick={this.storeData}>Data</Button>
        {this.state.test}
      </div>
    );
  };
}

export default Home;
