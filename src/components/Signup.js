import React, { Component} from 'react';

const baseURL = process.env.REACT_APP_BACKEND_URL  || "http://localhost:3003" ;
export default class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        baseURL: baseURL
      }
  
      handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value})
      }

      //Sasi - create route function
    createUser = (event) => {
      event.preventDefault();

      fetch(this.state.baseURL + "/mortgage", {
        method: 'POST',
        body: JSON.stringify({firstName: this.state.firstName, 
                              lastName: this.state.lastName, 
                              username: this.state.username, 
                              password: this.state.password,
                              address: "",
                              city: "",
                              state: "",
                              zip: "",
                              description: "",
                              yearBuilt: "",
                              loanPurpose: "",
                              ssn: ""}
                              ),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then (res => res.json())
        .then (resJson => {
          this.setState({
            signUp:false,
            firstName: "",
            lastName: "",
            username: "",
            password: ""
          })
      }).catch (error => console.error({'Error': error}))

    }


    render() {
      return (
        <div>
            <form className="form justify-content-center" onSubmit={this.createUser}>
            <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.firstName} placeholder="First name" id="firstName" name="firstName"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text"  onChange={this.handleChange} value={this.state.lastName} placeholder="Last name" id="lastName" name="lastName"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.username} id="username" name="username" placeholder="email"/>
              </div>
              <div className="form-group"> 
                  <input  className="form-control" type="password" onChange={this.handleChange} value={this.state.password} id="password" name="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                  <input className="btn btn-primary form-control" type="submit" value="Sign up"/>
              </div>  
            </form>
        </div>
      )
    }
  }