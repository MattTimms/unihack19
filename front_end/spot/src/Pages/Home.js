import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class Home extends Component {
  state = {};
  render() {
    return this.renderPage();
  }

  renderPage = () => {
    return (
      <div class="d-flex justify-content-center">
        <Link to="Analytics">
          <Button color="primary">Analytics</Button>
        </Link>
      </div>
    );
  };
}

export default Home;
