import React, { Component} from 'react';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Carousel from "./components/Carousel";
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
            <div className="jumbotron"> 
              <svg width="100px" height="100px" viewBox="0 0 16 16" class="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/>
              <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
             </svg><br></br>Mortgage Application
              <h6>Submit your details now to get your mortgage approved!</h6>
            </div>
             {this.state.isSignUp ? 
             <div className="login">
              <Login/>
              {/*<div style={{marginTop:"0px"}}>
               New User? Signup
              <button className="loginButton" onClick={this.signUp}> here </button>
              </div> */}
             </div>
             :
             <div>
             <div className="signUp">
              <Signup signUp={this.signUp}/>
              <div style={{marginTop:"0px"}}>
              Already have an account? <b>Login 
              <button className="loginButton" onClick={this.signUp}> here </button></b>
              </div>
            </div>
            <Carousel/>
            </div>
             }         
      </div>
    )
  }
}

