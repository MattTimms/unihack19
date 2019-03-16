import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <nav
        class="navbar mb-0 x d-flex justify-content-center"
        style={{
          background: "#689dfe",
          paddingBottom: "15px",
          width: "100%"
        }}
      >
        <Link to="/">
          <Button color="primary">Home</Button>
        </Link>
      </nav>
    );
  }
}

export default Header;
