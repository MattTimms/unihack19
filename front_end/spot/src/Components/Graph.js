import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Line } from "react-chartjs-2";

const data = {
  // All Values need to be from local storage!!!

  labels: ["January", "February"],

  datasets: [
    {
      label: "My First dataset",

      fill: false,

      lineTension: 0.1,

      backgroundColor: "rgba(75,192,192,0.4)",

      borderColor: "rgba(75,192,192,1)",

      borderCapStyle: "butt",

      borderDash: [],

      borderDashOffset: 0.0,

      borderJoinStyle: "miter",

      pointBorderColor: "rgba(75,192,192,1)",

      pointBackgroundColor: "#fff",

      pointBorderWidth: 1,

      pointHoverRadius: 5,

      pointHoverBackgroundColor: "rgba(75,192,192,1)",

      pointHoverBorderColor: "rgba(220,220,220,1)",

      pointHoverBorderWidth: 2,

      pointRadius: 1,

      pointHitRadius: 10,

      data: [10, 20]
      //data: JSON.parse(localStorage.getItem("percentages"))
    }
  ]
};

// const alertHello = () => {
//     //return <Redirect to='/Analytics'/>
//     this.props.replace('/Home');
// };

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  alertHello = () => {
    //return <Redirect to='/Analytics'/>
    this.props.history.push("/Home");
  };

  render() {
    // for date in entries:
    // dateArray.push(date)
    // for confidences in entries:
    // confArray.push(confidences)
    return (
      <div>
        <h2>Line Example</h2>

        <Line
          data={data}
          onElementsClick={elems => {
            this.alertHello();
          }}
        />
      </div>
    );
  }
}

export default Graph;
