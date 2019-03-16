import React, { Component } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

class MoleInfo extends Component {
  state = {};
  render() {
    return this.renderPage();
  }

  renderPage = () => {
    return (
      <div class="d-flex justify-content-center">
        <Link to="Graph">
          <Button color="primary">Analytics</Button>
        </Link>
      </div>
    );
  };
}

export default MoleInfo;

