import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnalyticsCard from "../Components/AnalyticsCard";
import analyticsData from "../Data/analyticsData";
import Header from "../Components/Header.js";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      data: analyticsData
    };
  }
  expandHandler = id => {
    this.props.history.push({
      pathname: "/MoleInfo",
      search: "query=abc",
      state: {
        id: id
      }
    });
  };
  render() {
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var superArray = [].concat(this.state.data);
    console.log(superArray);
    var todo = null;
    if (previousUserData != null) {
      superArray = superArray.concat(previousUserData);
    }
    todo = superArray.map(item => (
      <AnalyticsCard
        id={item.id}
        status={item.status}
        location={item.location}
        date={item.date}
        expandHandler={this.expandHandler}
      />
    ));

    console.log(todo);
    return (
      <div>
        <Header currentSpot={"Analytics"} />
        {todo}
      </div>
    );
  }
}
export default Analytics;
