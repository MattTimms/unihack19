import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
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

class AnalyticsCard extends Component {
    constructor(props) {
        super();
        this.state = {
            status: props.status,
            id: props.id,
            location: props.location,
            date: props.date
        };
    }

    expand = () => {
        this.props.expandHandler(this.state.id);
    };

    render() {
        console.log("This is the location:", this.state.location);
        return (
            <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', align: 'center'}}>
                <Card class="bg-secondary mb-3" >
                    <CardBody>
                        <CardSubtitle>Location: {this.state.location}</CardSubtitle>
                        <CardText>Last Photo: {this.state.date}</CardText>
                        <CardText>
                            {this.state.status ? (
                                <p><b>✓ Assessed by GP</b></p>
                            ) : (
                                <p><b>✗ Unchecked by GP</b></p>
                            )}
                        </CardText>
                    </CardBody>
                    <Button onClick={this.expand}>Learn more</Button>
                </Card>
            </div>
        );
    }
}

export default AnalyticsCard;
