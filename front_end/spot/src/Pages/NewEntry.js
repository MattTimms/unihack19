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
        <h1>Enter Date</h1>
        <TextInput
          value={this.state.date}
          name="date"
          placeholder="Date"
          onChange={this.handleChange}
        />


        <label>Select Month:</label>
        <select
          value={this.state.month}
          onChange={this.handleChange}
          name="month"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>


        <label>Select Day:</label>
        <select
          value={this.state.day}
          onChange={this.handleChange}
          name="day"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">12</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
        </select>

        <Button>Save</Button>
      </div>
    )
  }

}

export default Analytics;
