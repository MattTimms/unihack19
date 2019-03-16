import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard"
import analyticsData from "../Data/analyticsData"
import { Button } from 'reactstrap';

import { TextInput, Select } from 'grommet';

class Analytics extends Component {
  constructor() {
    super()
    this.state = {
      data: analyticsData,
      location: "",
      month: "",
      day: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSave(event){
    localStorage.setItem("")

  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({ [name]: value })

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

        <Button>Save</Button>
      </div>
    )
  }

}

export default Analytics;
