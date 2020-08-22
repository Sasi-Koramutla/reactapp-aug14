import React, { Component} from 'react';

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3003";
export default class Application extends Component {
    state = {
        address: "",
        city: "",
        state: "",
        zip: "",
        description: "",
        yearBuilt: "",
        loanPurpose: "",
        ssn: "",
        baseURL: baseURL,
        update:true
      }
  
      handleChange = (event) => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value})
      }
    
        //Sasi - create route function
    updateUser = (event) => {
        event.preventDefault();
        let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        fetch(this.state.baseURL +"/mortgage", {
          method: 'PUT',
          body: JSON.stringify({address: this.state.address,
                                city: this.state.city,
                                state: this.state.state,
                                zip: this.state.zip,
                                description: this.state.description,
                                yearBuilt: this.state.yearBuilt,
                                loanPurpose: this.state.loanPurpose,
                                ssn: this.state.ssn,
                                id: loginInfo.id}
                                ),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then (res => res.json())
          .then (resJson => {console.log(resJson);
            this.setState({
              signUp:false,
              address: resJson.address,
              city: resJson.city,
              state: resJson.state,
              zip: resJson.zip,
              description: resJson.description,
              yearBuilt: resJson.yearBuilt,
              loanPurpose: resJson.loanPurpose,
              ssn: resJson.ssn,
              update:false
            }) 
            localStorage.setItem("loginInfo",JSON.stringify({loginUsername: this.props.loginUsername,
                                                             id:resJson.id,
                                                            address: resJson.address,
                                                            city: resJson.city,
                                                            state: resJson.state,
                                                            zip: resJson.zip,
                                                            description: resJson.description,
                                                            yearBuilt: resJson.yearBuilt,
                                                            loanPurpose: resJson.loanPurpose,
                                                            ssn: resJson.ssn}));
        }).catch (error => console.error({'Error': error}))
  
      }

  
      getUser = () => {
        fetch(this.state.baseURL + "/mortgage/"+ this.props.loginUsername).then (res => res.json())
        .then (resJson => {console.log(resJson);
           this.setState({
            address: resJson.address,
            city: resJson.city,
            state: resJson.state,
            zip: resJson.zip,
            description: resJson.description,
            yearBuilt: resJson.yearBuilt,
            loanPurpose: resJson.loanPurpose,
            ssn: resJson.ssn
          }) 
          localStorage.setItem("loginInfo",JSON.stringify({loginUsername: this.props.loginUsername,
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
     this.getUser(); 
    let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if(loginInfo)
    this.setState({address: loginInfo.address,
                    city: loginInfo.city,
                    state: loginInfo.state,
                    zip: loginInfo.zip,
                    description: loginInfo.description,
                    yearBuilt: loginInfo.yearBuilt,
                    loanPurpose: loginInfo.loanPurpose,
                    ssn: loginInfo.ssn});
    }  
    render() {
      return (
        <div>{this.state.update? 
            <form className="form justify-content-center" style={{width:"80%", margin:"10px auto"}} onSubmit={this.updateUser}>
            <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.address} placeholder="Property Address" id="address" name="address"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text"  onChange={this.handleChange} value={this.state.city} placeholder="City" id="city" name="city"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.state} id="state" name="state" placeholder="State"/>
              </div>
              <div className="form-group"> 
                  <input  className="form-control" type="number" onChange={this.handleChange} value={this.state.zip} id="zip" name="zip" placeholder="Zip"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.description} id="description" name="description" placeholder="Property Description"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="number" onChange={this.handleChange} value={this.state.yearBuilt} id="yearBuilt" name="yearBuilt" placeholder="Year Built"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="text" onChange={this.handleChange} value={this.state.loanPurpose} id="loanPurpose" name="loanPurpose" placeholder="Purpose of Loan"/>
              </div>
              <div className="form-group">
                  <input className="form-control" type="password" onChange={this.handleChange} value={this.state.ssn} id="ssn" name="ssn" placeholder="Borrower's SSN"/>
              </div>
              <div className="form-group">
                  <input className="btn btn-success form-control" style={{width:"70%", marginLeft:"15%"}} type="submit" value="Update"/>
              </div>  
            </form>: <div><h4>Updated!</h4></div>}
        </div>
      )
    }
  }