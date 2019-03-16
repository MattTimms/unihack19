import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnalyticsCard from "../Components/AnalyticsCard"
import analyticsData from "../Data/analyticsData"
import Graph from "../Components/Graph"

class Analytics extends Component {
  constructor() {
    super()
    this.state = {
      data: analyticsData
    }
  }
  render() {

    return (
      <div>
        <Graph />
      </div>
    )
  }

}

export default Analytics;
