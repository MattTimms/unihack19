import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnalyticsCard from "../Components/AnalyticsCard";
import analyticsData from "../Data/analyticsData";
import AreaGraph from "../Components/AreaChart";
import Header from "../Components/Header.js";
class MoleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: analyticsData,
      id: props.location.state.id
    };
  }
  render() {
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var dataArray = [];
    var newId = null;
    var entries = [];
    if (previousUserData != null) {
      dataArray = previousUserData;
    }
    console.log(this.state.id);
    for (var i in dataArray) {
      if (dataArray[i]["id"] == this.state.id) {
        console.log("test");
        var newEntries = dataArray[i]["entries"];
        var newId = i;
      }
    }
    return (
      <div>
        <Header currentSpot={"Tracking"} />
        <AreaGraph id={newId} entries={newEntries} />
      </div>
    );
  }
}

export default MoleInfo;
