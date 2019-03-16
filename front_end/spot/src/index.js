import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Importing Pages
import Home from "./Pages/Home.js";
import Analytics from "./Pages/Analytics.js";
import Camera from "./Pages/Camera.js";
import Prediction from "./Pages/Prediction.js";
import ExtraInfo from "./Pages/ExtraInfo.js";
import Crop from "./Pages/Crop.js";
import NewEntry from "./Pages/NewEntry";
import SaveSelect from "./Pages/SaveSelect";
import MoleInfo from "./Pages/MoleInfo";

//Importing Components
import Header from "./Components/Header.js";
import 
const main = (
  <Router style={{}}>
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Header />
      <div className="d-flex justify-content-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Analytics" component={Analytics} />
        <Route path="/Camera/Prediction" component={Prediction} />
        <Route path="/Camera/ExtraInfo" component={ExtraInfo} />
        <Route path="/Camera" component={Camera} />
        <Route path="/Crop" component={Crop} />
        <Route path="/"
        <Route path="/NewEntry" component={NewEntry} />
        <Route path="/SaveSelect" component={SaveSelect} />
        <Route path="/MoleInfo" component={MoleInfo} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(main, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
