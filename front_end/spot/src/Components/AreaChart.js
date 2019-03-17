import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AreaChart } from "react-easy-chart";
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
class AreaGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: props.entries,
      picDisplay: null,
      imgSrc: null
    };
  }

  render() {
    var newData = [];
    for (var i in this.state.entries) {
      var newPoint = {
        x: this.state.entries[i]["date"],
        y: this.state.entries[i]["percentage"]
      };
      newData.push(newPoint);
    }
    console.log(this.state.picDisplay);
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          <AreaChart
            xType={"time"}
            axes
            dataPoints
            xTicks={5}
            yTicks={3}
            dotRadius={50}
            grid
            clickHandler={d =>
              this.setState({
                dataDisplay: `The value of x is ${d.x} and y is ${d.y}`
              })
            }
            tickTimeDisplayFormat={"%d %m"}
            interpolate={"cardinal"}
            width={300}
            height={280}
            yDomainRange={[0, 100]}
            data={[newData]}
            clickHandler={d => {
              for (var i in this.state.entries) {
                var imgSource = null;
                if (this.state.entries[i]["date"] == d.x) {
                  console.log("test");
                  imgSource = this.state.entries[i]["image"];
                }
              }
              this.setState({
                picDisplay: `${d.x}, ${d.y}%`,
                imgSrc: imgSource
              });
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            verticalAlign: "top",
            paddingLeft: "20px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.picDisplay ? (
            <Card style={{ border: "4px solid #e5e5e5" }}>
              <CardBody
                style={{
                  display: "flex",
                  verticalAlign: "top",
                  paddingLeft: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <img
                  class="card-img-top"
                  alt="Card image cap"
                  src={this.state.imgSrc}
                  style={{ height: "80px", width: "80px", margin: "5px" }}
                />
                <div class="card-body">
                  <p class="card-text">Date: {this.state.picDisplay}</p>
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AreaGraph;
