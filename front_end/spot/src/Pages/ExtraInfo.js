import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "../Components/Header.js";
var types = {
  Meaning: ["What does this mean?", "What!", "What?"],
  Action: ["What can I do?", "Action!", "Change"],
  How: ["How have these results been calculated?", "How?"]
};

class ExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.location.state.detail
    };
  }
  state = {};
  render() {
    return (
      <div
        class="column"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Header currentSpot={types[this.state.type][2]} />
        <h3 style={{ textAlign: "center" }}>{types[this.state.type][0]}</h3>
        <p>{types[this.state.type][1]}</p>
      </div>
    );
  }
}

export default ExtraInfo;
