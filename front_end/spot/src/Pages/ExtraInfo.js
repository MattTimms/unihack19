import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, Button, CardTitle, CardText } from "reactstrap";
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
      <div>
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
        <div id="card1">
          <Card
            body
            inverse
            style={{
              backgroundColor: "red",
              borderColor: "red",
              borderColor: "red"
            }}
          >
            <CardTitle>How to spot a malignant mole?</CardTitle>
            <CardText>
              · Changes in size (getting larger) · A change in shape (especially
              with irregular edges) · Colour changes (especially getting darker
              or exhibiting multiple shades) · A loss of symmetry (common moles
              will be perfectly round or oval and are usually symmetrical)
            </CardText>
          </Card>
        </div>
        <div id="card2">
          <Card body inverse color="success">
            <CardTitle>How to spot a benign mole?</CardTitle>
            <CardText>
              · Have neat edges, · Are smooth or dome-shaped, · Are around ¼
              inch (6 mm) in diameter, · Preserve the same shape, size or colour
              over time.
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default ExtraInfo;
