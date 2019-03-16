import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard"
import analyticsData from "../Data/analyticsData"
import { Button } from 'reactstrap';

import { TextInput } from 'grommet';

class Analytics extends Component {
  constructor() {
    super()
    this.state = {
      data: analyticsData,
      location: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSave(event){
    console.log("saved")
    // set new data attribute
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({ [name]: value })
    // set new data attribute
  }

  render() {

    var todo = this.state.data.map(item => <SaveSelectCard id={item.id}
                                                      status={item.status}
                                                      location={item.location}
                                                      date={item.date}/>)
    //console.log(todo)
    return (
      <div>
        <h1>Enter Mole Location</h1>
        <TextInput
          value={this.state.location}
          name="location"
          placeholder="Location"
          onChange={this.handleChange}
        />
        <h1>Enter Mole Location</h1>
        <TextInput
          value={this.state.location}
          name="location"
          placeholder="Location"
          onChange={this.handleChange}
        />
        <p>{this.state.location}</p>
      </div>
    )
  }

}

export default Analytics;
