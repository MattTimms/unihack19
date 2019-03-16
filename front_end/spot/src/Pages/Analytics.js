import React, { Component } from "react";
import ReactDOM from "react-dom";
import AnalyticsCard from "../Components/AnalyticsCard"
import analyticsData from "../Data/analyticsData"

class Analytics extends Component {
  constructor(){
    super()
    this.state = {
      data: analyticsData
    }
  }

  renderBody() {

    var todo = this.state.data.map(item => <AnalyticsCard id={item.id}
                                                          checked={item.checked}
                                                          date={item.dateOfLastPhoto}
                                                          location={item.location}/>)

    console.log(todo)
    return (
      <div>
        {todo}
      </div>
    )
  }

  render() {
    return (
      this.renderBody()
    )
  }



}

export default Analytics;
