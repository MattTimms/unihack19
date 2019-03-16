import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AreaChart } from "react-easy-chart";
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
            grid
            clickHandler={d =>
              this.setState({
                dataDisplay: `The value of x is ${d.x} and y is ${d.y}`
              })
            }
            tickTimeDisplayFormat={"%d %m"}
            interpolate={"cardinal"}
            width={250}
            height={250}
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
                picDisplay: `[${d.x}, ${d.y}]`,
                imgSrc: imgSource
              });
            }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            paddingLeft: "20px"
          }}
        >
          {this.state.picDisplay ? (
            <img
              src={this.state.imgSrc}
              style={{ height: "100px", width: "100px" }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default AreaGraph;
