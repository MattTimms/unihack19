import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard";
import analyticsData from "../Data/analyticsData";
import { Button } from "reactstrap";
import Header from "../Components/Header.js";

class SaveSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      data: analyticsData,
      newEntry: props.location.state.detail
    };
    console.log(this.state.newEntry);
    this.handleCreateNewEntry = this.handleCreateNewEntry.bind(this);
    this.handleSaveToEntry = this.handleSaveToEntry.bind(this);
  }

  handleCreateNewEntry() {
    this.props.history.push({
      pathname: "/NewEntry",
      search: "query=abc",
      state: {
        detail: this.state.newEntry
      }
    });
  }

  handleSaveToEntry() {
    console.log("saving to entry");
  }

  render() {
    var date = new Date();
    console.log("Date:", date.getDate());
    console.log("Month:", date.getMonth() + 1);
    var previousUserData = JSON.parse(localStorage.getItem("Userdata"));
    var todo = null;
    if (previousUserData != null) {
      todo = previousUserData.map(item => (
        <SaveSelectCard
          id={item.id}
          status={item.status}
          loc={item.location}
          date={item.date}
          newEntry={this.state.newEntry}
        />
      ));
    } else {
      todo = "empty";
    }
    return (
      <div>
        <Header currentSpot={"Save Entry"} />
        {todo}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            onClick={this.handleCreateNewEntry}
            style={{
              direction: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "20px",
              position: "relative"
            }}
          >
            <i class="fas fa-plus" />
          </Button>
        </div>
      </div>
    );
  }
}

export default SaveSelect;
