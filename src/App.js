import React, { Component} from 'react';
import Signup from "./components/Signup";
import Login from "./components/Login";
//import Application from "./components/Application";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    isSignUp:false
  }
  this.signUp = this.signUp.bind(this);
}
  signUp () {
    //event.preventDefault();
    console.log("Here");
    this.setState({isSignUp: !this.state.isSignUp});
    console.log(this.state.isSignUp);
    }
  
   componentDidMount() {
      //Sasi = Storing token and userid
      let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      console.log(loginInfo);
    }
  render() {
    return (
      <div className="main">
            <div className="jumbotron"> Mortgage Application
            <h6>Sign up now to get your mortgage approved!</h6></div>
            {this.state.isSignUp ? 
             <div className="login">
              <Login/>
              {/*<div style={{marginTop:"0px"}}>
               New User? Signup
              <button className="loginButton" onClick={this.signUp}> here </button>
              </div> */}
             </div>
             :
             <div className="signUp">
              <Signup/>
              <div style={{marginTop:"0px"}}>
              Already have an account? <b>Login 
              <button className="loginButton" onClick={this.signUp}> here </button></b>
              </div>
            </div>
             }         
           <div className="carousel">**********Carousel Planned************</div>  
      </div>
    )
  }
}

