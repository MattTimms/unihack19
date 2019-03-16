import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "../Components/Header.js";
var types = {
  Meaning: ["What does this mean?", "What!", "What?"],
  Action: [
    "What can I do?",
    "If you feel concerned about the appearance of a mole or freckle, you should always consult your doctor. Remaining SunSmart is the best protection from skin cancer. Remember to check your skin regularly for any new spots or changes in shape, colour or size of existing spots. If you notice anything unusual, see your doctor as soon as possible. Most skin cancer can be successfully treated if it is found early.",
    "Change"
  ],
  How: [
    "How have these results been calculated?",
    "Every photo taken with `Spot` is compared against a larger dataset; expertly labelled by a consensus of dermatologists and confirmed by pathology screenings. The current dataset `Spot` implements has over ~30k images - and growing! By applying machine learning, we can provide assistance in self-monitoring your skin's health. `Spot` is not a substitute for expert medical advice from you doctor. Remember, if you have any concerns or questions, please contact your doctor.",
    "How?"
  ]
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
        <p style={{ margin: "7px" }}>{types[this.state.type][1]}</p>
      </div>
    );
  }
}

export default ExtraInfo;
