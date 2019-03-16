import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class AnalyticsCard extends Component {
  constructor(props){
    super()
    this.state = {
      status: props.status,
      id: props.id,
      location: props.location,
      dateOfLastPhoto: props.dateOfLastPhoto
    }
  }
  render() {
    console.log("This is the location:", this.state.location)
    return (
      <div>
        <p>{this.state.location}</p>
      </div>
    );
  }
}

export default AnalyticsCard;
