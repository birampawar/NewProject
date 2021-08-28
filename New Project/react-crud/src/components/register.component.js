import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import { BrowserRouter, Switch,Route, Link } from "react-router-dom";
import Search from "./search.component";
import Login from "./login.component";
import validator from 'validator';
//import logo from '../images/agiliad-logo.png'
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeretypePassword = this.onChangeretypePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      UserName: "",
      Password: "", 
      retypePassword: "",
      submitted: false,
    };
  }

  onChangeUserName(e) {
    this.setState({
      UserName: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value
    });
  }

  onChangeretypePassword(e) {
    this.setState({
      retypePassword: e.target.value
    });
  }

    saveUser() {
      
      
     
    var data = {
      UserName: this.state.UserName,
      Password: this.state.Password,
      retypePassword : this.state.retypePassword
    };
    var pass = this.state.Password
    var repass = this.state.retypePassword
    if(pass !== repass){
      alert("Password and Retype Password should Match");
    }
    if (validator.isStrongPassword(pass, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })){
     
    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          UserName: response.data.UserName,
          Password: response.data.Password,
          retypePassword : response.data.retypePassword,
          submitted: true
        });
        console.log(response.data);
        if(response.status === 200){
          alert("Registered Successfully");
          this.props.handleChange(true);
        }
        this.newEmployee();
      })
      .catch(e => {    
        console.log(e);
      });
    }
    else{
      alert("Password must be alphanumeric and contain symbols");
    }

}

  newEmployee() {
    this.setState({
      id: null,
      UserName: "",
      Password: "",
      retypePassword:"",
      submitted: false
    });
  }
  render() {
        return (      
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
            />
            {/* Main Content */}
            <div className="search" >
                {/* <form action= "/register"  method="POST"> */}
                    <input className="small" 
                    align="center" 
                    type="text" required
                    value={this.state.UserName}
                    onChange={this.onChangeUserName}
                    name="UserName" 
                    id="UserName" placeholder="Username"/>
                    <input className="small" 
                    type="password" required minLength="6" 
                    value={this.state.Password} 
                    name="Password" 
                    id="Password" 
                    placeholder="password" 
                    onChange={this.onChangePassword}
                    />
                    <input className="small" 
                    type="password" required minLength="6"
                    value={this.state.retypePassword} 
                    name="retypePassword" 
                    id="retypePassword"
                    placeholder="retypepassword" 
                    onChange={this.onChangeretypePassword}/>
                    <input className="btnsubmit" onClick={this.saveUser} type="submit" value="Submit" /><br/> 
                    <br />

                {/* </form> */}
            </div>
            
        </div>
        
    )
  }
}