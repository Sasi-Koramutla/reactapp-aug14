import React, { Component} from 'react';
import Application from "../components/Application";
const baseURL = process.env.REACT_APP_BACKEND_URL  || "http://localhost:3003";
export default class Login extends Component {
    state = {
        loginUsername: "",
        loginPassword: "",
        baseURL: baseURL,
        isLogin:false,
        loginInfo:{}
      }
  
      handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value})
      }

      //Sasi - create route function
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
            isLogin:true
        })
        localStorage.setItem("loginInfo",JSON.stringify({id:resJson.id, loginPassword: resJson.password, loginUsername:resJson.username, token:resJson.token, address: resJson.address,
                                                          city: resJson.city,
                                                          state: resJson.state,
                                                          zip: resJson.zip,
                                                          description: resJson.description,
                                                          yearBuilt: resJson.yearBuilt,
                                                          loanPurpose: resJson.loanPurpose,
                                                          ssn: resJson.ssn}));
      }).catch (error => console.error({'Error': error}))
    
    }

    logout = (event) => {
        event.preventDefault();
        this.setState({ loginUsername: "",
                        loginPassword: "",
                        isLogin: false, 
                        token:""});
        localStorage.clear();
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
        <div>       
                    {this.state.isLogin?<div> <button className="btn btn-danger form-control" style={{marginLeft:"100px", width:"100px"}} onClick={this.logout}>Logout</button>
                       <Application loginUsername={this.state.loginUsername}/> </div>:<ul className="nav justify-content-center">
                    <li className="nav-item">
                      <input className="form-control" type="text" onChange={this.handleChange} value={this.state.loginUsername} id="loginUsername" name="loginUsername" placeholder="email (Username)"/>
                    </li>
                    <li className="nav-item">
                        <input  className="form-control" type="password" onChange={this.handleChange} value={this.state.loginPassword} id="loginPassword" name="loginPassword" placeholder="Password"/>
                    </li>
                    <li className="nav-item">    
                    <button className="btn btn-dark form-control" style={{marginLeft:"6px"}}onClick={this.login}>Login</button>
                    </li>
                  </ul>}
        </div>
      )
    }
  }