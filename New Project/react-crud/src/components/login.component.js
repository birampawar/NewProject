import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import Search from "./search.component";
import { BrowserRouter, Link, NavLink, Redirect, Route, Router, Switch } from "react-router-dom";
import { useHistory } from "react-router";
//import logo from '../images/agiliad-logo.png'
import NotificationManager from 'react-notifications';
import Forgot from "./forgot.component";
import App from "../App";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      UserName: "",
      Password: "", 
      selectedOption: "employee",
      submitted: false
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

  saveUser() {
    var data = {
      UserName: this.state.UserName,
      Password: this.state.Password,
      selectedOption: this.state.selectedOption
    };



    EmployeeDataService.login(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          UserName: response.data.UserName,
          Password: response.data.Password,
          // selectedOption: response.data.selectedOption,
          submitted: true
        });
        console.log(response.data);
        if(response.status === 200){
          alert("Login Successful");
          this.props.handleChange(true,response.data.id, this.state.selectedOption);
        }
        else{
          console.log("in else");
          window.alert(response.data)
        }
        this.newEmployee();
      })
      .catch(e => {
        alert("Invalid Credentials");
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      UserName: "",
      Password: "",
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
      <div className="search">
          {/* <form action= "/login"  method="POST"> */}
              <input className="small" 
              type="text" required
              value= {this.state.UserName}
              name="UserName" 
              id="username" 
              placeholder="Username" 
              onChange={this.onChangeUserName}/>
              <input className="small" 
              type="password" minLength="6" required
              value={this.state.Password} 
              name="Password" 
              id="password" 
              placeholder="password" 
              onChange={this.onChangePassword}/>    
              <div className="check">
                  <input className="rbtn" 
                  type="radio" checked
                  value="employee"
                  name="typ"
                  onChange={(e) =>{this.setState({selectedOption:e.target.value})}}
                  ></input> Employee
                  <input className="rbtn" 
                  type="radio" 
                  value="HR"
                  name="typ"
                  onChange={(e) =>{this.setState({selectedOption:e.target.value})}}
                  ></input> HR
                  <input className="rbtn" 
                  type="radio" 
                  value="Admin"
                  name="typ"
                  onChange={(e) =>{this.setState({selectedOption:e.target.value})}}
                  ></input> Admin
              </div>
              <input className="btnsubmit" required onClick={this.saveUser} type="submit" value="Submit" />
              <a href="#" onClick={this.props.handleForgot}>Forgot Password</a>
              {/* <BrowserRouter>
              <NavLink to="/reset">Forgot password ?</NavLink>
              <Switch> 
                {/* <Route exact path="/" component={App}></Route> */}
                {/* <Route exact={false} path="/reset" component={Forgot}></Route>
              </Switch>
              </BrowserRouter> */} 
      </div>
      
  </div>
        
    )
  }
}