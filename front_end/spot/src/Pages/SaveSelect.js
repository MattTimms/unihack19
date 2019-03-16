import React, { Component } from "react";
import ReactDOM from "react-dom";
import SaveSelectCard from "../Components/SaveSelectCard"
import analyticsData from "../Data/analyticsData"
import { Button } from 'reactstrap';

class SaveSelect extends Component {
  constructor(props) {
    super()
    this.state = {
      data: analyticsData
    }
    this.handleCreateNewEntry = this.handleCreateNewEntry.bind(this)
    this.handleSaveToEntry = this.handleSaveToEntry.bind(this)
  }

  handleCreateNewEntry(){
    console.log("entry created")

  }

  handleSaveToEntry(){
    console.log("saving to entry")

  }

  render() {
    var date = new Date()
    console.log("Date:", date.getDate())
    console.log("Month:", date.getMonth() + 1)

    var todo = this.state.data.map(item => <SaveSelectCard id={item.id}
                                                      status={item.status}
                                                      location={item.location}
                                                      date={item.date}/>)
    return (
      <div>
        {todo}
        <Button onClick={this.handleCreateNewEntry}>Create New Entry</Button>
        <Button onClick={this.handleSaveToEntry}>Save To Existing</Button>
      </div>
    )
  }

}

export default SaveSelect;
