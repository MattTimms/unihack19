import React, { Component} from "react";
import ReactDOM from "react-dom";

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Jumbotron, Button, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const percentage = 66;
class Home extends Component {
  state = { test: "nope" };
  render() {
    return this.renderPage();
  }
  storeData = () => {
    console.log("test");
    console.log(localStorage.getItem("myData"));
    if (localStorage.getItem("myData") != null) {
      this.setState({ test: "test" });
    }
    localStorage.setItem("myData", "testing");
  };
  renderPage = () => {
    return (
   
    <div>
      
    
    
      <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-4">Hello</h1>
          <h1 className="display-4">Emma,</h1>
          <p className="lead">What would you like to do today?</p>
        </Container>
      </Jumbotron>
    </div>
        

    
    <div class="d-flex justify-content-center" >
    
    <CircularProgressbar
        percentage={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        initialAnimation
        styles={{
          background: {
            fill: '#865CD6',
          },
          text: {
            fill: '#fff',
          },
          path: {
            stroke: '#fff',
          },
          trail: { stroke: 'transparent' },
        }}
      />
    
    </div>







     <div id="footer" class= "d-flex justify-content-left" > 
      <div id="c1">
       
      
        <Link to="Analytics">
         
          <Button color="primary" size="lg"><i class="fas fa-chart-line fa-3x"></i></Button>
          
        
        </Link>
        <Button onClick={this.storeData}>Data</Button>
        {this.state.test}
      </div>

      <div id="c2">
        <Link to="Camera">
          <Button color="danger" size="lg"><i class="fas fa-camera fa-3x"></i></Button>
        </Link>
      </div>

        <div id="c3">
         <Link to="Self Care">  
          <Button color="warning" size="lg"><i class="fas fa-notes-medical fa-3x"></i></Button>
         </Link>
        </div>
     </div>
    
     
    </div>  

    );
  };

  
}
//Self care = Prediction

 

export default Home;
