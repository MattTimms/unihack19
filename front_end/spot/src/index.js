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

//Importing Components
import Header from "./Components/Header.js";

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
      <div class="d-flex justify-content-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Analytics" component={Analytics} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(main, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
