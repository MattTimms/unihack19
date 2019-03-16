import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class SaveSelectCard extends Component {
  constructor(props){
    super()
    this.state = {
      status: props.status,
      id: props.id,
      location: props.location,
      date: props.date
    }
  }
  render() {
    console.log("This is the location:", this.state.location)
    return (
      <div>

       <Card>
         <CardBody>
           <CardSubtitle>Location: {this.state.location}</CardSubtitle>
         <Button>Save!</Button>
         </CardBody>
       </Card>

      </div>
    );
  }
}

export default SaveSelectCard;
