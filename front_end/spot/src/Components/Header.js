import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from "../img/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSpot: props.currentSpot };
  }

  render() {
    return (
      <nav
        className="navbar mb-0 x fixed-top"
        style={{
          background: "#ffffff",
          paddingBottom: "15px",
          marginBottom: "15px",
          width: "100%",
          position: "relative",
          top: "0px",
          height: "60px"
        }}
      >
        <Link to="/">
          {/*<Button
            style={{
              position: "absolute",
              top: " 8px",
              backgroundColor: "#c63939"
            }}
          >
            Home
          </Button>*/}
          <h2>
            <img src={logo} style={{ width: "50px", paddingBottom: "15px" }} />
          </h2>
          <h2
            style={{
              position: "absolute",
              right: "10px",
              top: "6px",
              color: "#000000"
            }}
          >
            <p style={{ fontWeight: "bold" }}>{this.state.currentSpot}</p>
          </h2>
        </Link>
      </nav>
    );
  }
}

export default Header;
