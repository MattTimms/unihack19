import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard"
import analyticsData from "../Data/analyticsData"
import { Button } from 'reactstrap';

class Analytics extends Component {
  constructor() {
    super()
    this.state = {
      data: analyticsData
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(){
    console.log("saved")
    // localStorage.setitem("percentages", "[0.9, 0.8, 0.5, 0.4]")
    // set new data attribute
  }

  render() {

    var todo = this.state.data.map(item => <SaveSelectCard id={item.id}
                                                      status={item.status}
                                                      location={item.location}
                                                      date={item.date}/>)
    console.log(todo)
    return (
      <div>
        {todo}
        <Button onClick={this.handleSave}>Create New Entry</Button>
      </div>
    )
  }

}

export default Analytics;
