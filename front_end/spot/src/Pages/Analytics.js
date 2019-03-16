import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnalyticsCard from "../Components/AnalyticsCard";
import analyticsData from "../Data/analyticsData";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      data: analyticsData
    };
  }
  render() {
    var todo = this.state.data.map(item => (
      <AnalyticsCard
        id={item.id}
        status={item.status}
        location={item.location}
        date={item.date}
      />
    ));
    console.log(todo);
    return <div>{todo}</div>;
  }
}

export default Analytics;
