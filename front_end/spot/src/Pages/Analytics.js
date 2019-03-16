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
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var superArray = this.state.data;
    var todo = null;
    if (previousUserData != null) {
      todo = previousUserData.map(item => (
        <AnalyticsCard
          id={item.id}
          status={item.status}
          location={item.location}
          date={item.date}
        />
      ));
    } else {
      todo = "No moles saved";
    }

    console.log(todo);
    return <div>{todo}</div>;
  }
}

export default Analytics;
