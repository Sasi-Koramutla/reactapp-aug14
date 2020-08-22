import React, { Component} from 'react';
import Application from "../components/Application";
const baseURL = process.env.REACT_APP_BACKEND_URL  || "http://localhost:3003";
export default class Login extends Component {
    state = {
        loginUsername: "",
        loginPassword: "",
        baseURL: baseURL,
        isLogin:false,
        loginInfo:{},
        validated:false,
        view:true,
        address: "",
        city: "",
        state: "",
        zip: "",
        description: "",
        yearBuilt: "",
        loanPurpose: "",
        ssn: ""
      }
  
      handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value})
      }

      //Sasi - login function
    login = (event) => {
    event.preventDefault();
    fetch(this.state.baseURL + '/mortgage/login', {
        method: 'POST',
        body: JSON.stringify({username: this.state.loginUsername, 
                            password: this.state.loginPassword}
                            ),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then (res => res.json())
        .then (resJson => {console.log(resJson);
        this.setState({
            loginUsername: resJson.username,
            loginPassword: "",
            token:resJson.token,
            userid:resJson.id,
            isLogin:true,
            validated:resJson.validated,
            address: resJson.address,
            city: resJson.city,
            state: resJson.state,
            zip: resJson.zip,
            description: resJson.description,
            yearBuilt: resJson.yearBuilt,
            loanPurpose: resJson.loanPurpose,
            ssn: resJson.ssn
        })
        localStorage.setItem("loginInfo",JSON.stringify({id:resJson.id, 
                                                         loginPassword: resJson.password, 
                                                         loginUsername:resJson.username,
                                                          token:resJson.token, 
                                                          address: resJson.address,
                                                          city: resJson.city,
                                                          state: resJson.state,
                                                          zip: resJson.zip,
                                                          description: resJson.description,
                                                          yearBuilt: resJson.yearBuilt,
                                                          loanPurpose: resJson.loanPurpose,
                                                          ssn: resJson.ssn,
                                                        validated: resJson.validated}));
      }).catch (error => console.error({'Error': error}))
    
    }

   // delete user 
   delete = (event) => {
      //event.preventDefault();
      console.log("in delete");
      let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      fetch(this.state.baseURL + '/mortgage/' + loginInfo.id, {
          method: 'DELETE',
          body: JSON.stringify({username: this.state.loginUsername, 
            password: this.state.loginPassword}
            ),
          headers: {
          'Content-Type': 'application/json'
          }
      }).then(res =>  {
        return res.json()}).then(resJson => {console.log(resJson)
                                              this.setState({
                                                isLogin:false
                                          })}).catch (error => console.error({'Error': error}))
      
      }

    logout = (event) => {
        event.preventDefault();
        this.setState({ loginUsername: "",
                        loginPassword: "",
                        isLogin: false, 
                        token:""});
        localStorage.clear();
    }

    edit = (event) => {
      event.preventDefault();
      this.setState({ view: !this.state.view});
  }

  view = (event) => {
    event.preventDefault();
    fetch(this.state.baseURL + "/mortgage/"+ this.state.loginUsername).then (res => res.json())
    .then (resJson => {console.log(resJson);
       this.setState({
        address: resJson.address,
        city: resJson.city,
        state: resJson.state,
        zip: resJson.zip,
        description: resJson.description,
        yearBuilt: resJson.yearBuilt,
        loanPurpose: resJson.loanPurpose,
        ssn: resJson.ssn,
        view: !this.state.view
      }) 
      localStorage.setItem("loginInfo",JSON.stringify({
                                                      id:resJson.id,
                                                      address: resJson.address,
                                                      city: resJson.city,
                                                      state: resJson.state,
                                                      zip: resJson.zip,
                                                      description: resJson.description,
                                                      yearBuilt: resJson.yearBuilt,
                                                      loanPurpose: resJson.loanPurpose,
                                                      ssn: resJson.ssn}));
  }).catch (error => console.error({'Error': error}));
}

    componentDidMount() {
      //Sasi = Storing token and userid
      let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      console.log(loginInfo);
      if(loginInfo && loginInfo.token)
      this.setState({token:loginInfo.token, userid:loginInfo.id, loginUsername:loginInfo.loginUsername, login:true, loginInfo:loginInfo});
    }

    render() {
      return (
        <div >       
                    {this.state.isLogin?<div className="loginDiv"> <div className="actionDiv"> {this.state.view? <button className="btn btn-success form-control" style={{margin:"10px auto", width:"150px"}} onClick={this.edit}>Edit Profile</button> : <button className="btn form-control" style={{margin:"10px auto", width:"150px"}} onClick={this.view}>View Profile</button>}
                                                                        <button className="btn btn-danger form-control" style={{margin:"10px auto", width:"150px"}} onClick={this.delete}>Delete Profile</button>
                                                                        <button className="btn btn-dark form-control" style={{margin:"10px auto", width:"150px"}} onClick={this.logout}>Logout</button>
                                                                        </div>

                       {this.state.validated? <div style={{color:"green", margin:"auto"}}><h4>email verified</h4></div>:<div style={{color:"red", margin:"10px auto"}}><h4>email not verified! Check your email for verification link</h4> </div>}
                       {this.state.view? <table className="table table-light" style={{color:"black", backgroundColor:"peachpuff"}}>
                                              <tr><td><b>Address</b></td><td>{this.state.address}</td></tr>
                                              <tr><td><b>City</b></td><td>{this.state.city}</td></tr>
                                              <tr><td><b>State</b></td><td>{this.state.state}</td></tr>
                                              <tr><td><b>Zip</b></td><td>{this.state.zip}</td></tr>
                                              <tr><td><b>description</b></td><td>{this.state.description}</td></tr>
                                              <tr><td><b>Loan Purpose</b></td><td>{this.state.loanPurpose}</td></tr>
                                              <tr><td><b>Year Built</b></td><td>{this.state.yearBuilt}</td></tr>
                                          </table>
                                          :
                                          <Application loginUsername={this.state.loginUsername}/>} </div>:
                    <div>
                      <ul className="nav justify-content-center">
                      <li className="nav-item">
                        <input className="form-control" type="text" onChange={this.handleChange} value={this.state.loginUsername} id="loginUsername" name="loginUsername" placeholder="email (Username)"/>
                      </li>
                      <li className="nav-item">
                          <input  className="form-control" type="password" onChange={this.handleChange} value={this.state.loginPassword} id="loginPassword" name="loginPassword" placeholder="Password"/>
                      </li>
                      <li className="nav-item">    
                      <button className="btn btn-dark form-control" style={{marginLeft:"6px"}}onClick={this.login}>Login</button>
                      </li>
                    </ul>
                  </div>}
        </div>
      )
    }
  }