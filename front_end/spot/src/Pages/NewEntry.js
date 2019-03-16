import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard";
import analyticsData from "../Data/analyticsData";
import { Button } from "reactstrap";

import { TextInput, Select } from "grommet";

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: analyticsData,
      location: "",
      entry: props.location.state.detail
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave(event) {
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var dataArray = [];
    if (previousUserData != null) {
      dataArray = previousUserData;
    }
    var newEntryArray = {
      id: 5 + dataArray.length,
      status: false,
      location: this.state.location,
      date: this.state.entry["date"],
      entries: [this.state.entry]
    };
    dataArray.push(newEntryArray);
    localStorage.setItem("Userdata", JSON.stringify(dataArray));
    this.props.history.push({
      pathname: "/Analytics",
      search: "query=abc",
      state: {}
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
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

        <Button onClick={this.handleSave}>Save</Button>
      </div>
    );
  }
}

export default NewEntry;
