import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import analyticsData from "../Data/analyticsData";
class SaveSelectCard extends Component {
  constructor(props) {
    super();
    this.state = {
      status: props.status,
      id: props.id,
      location: props.location,
      date: props.date
    };
  }
  save = () => {
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var dataArray = [];
    if (previousUserData != null) {
      dataArray = previousUserData;
    }
  };
  render() {
    console.log("This is the location:", this.state.location);
    return (
      <div>
        <Card>
          <CardBody>
            <CardSubtitle>Location: {this.state.location}</CardSubtitle>
            <Button onClick={this.save}>Save!</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SaveSelectCard;
