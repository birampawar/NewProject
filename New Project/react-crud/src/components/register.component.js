import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import { BrowserRouter, Switch,Route, Link } from "react-router-dom";
import Search from "./search.component";
import Login from "./login.component";
//import logo from '../images/agiliad-logo.png'
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeretypePassword = this.onChangeretypePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newEmployee = this.newEmployee.bind(this);
    this.validateUsernamePassword = this.validateUsernamePassword.bind(this);


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

  validateUsernamePassword(){
    if(this.state.UserName==="")
    {
      alert("Please Fill All fields")
      return false;
      
    }
    if(this.state.retypePassword!== this.state.Password)
    {
      alert("password Didn't matched");
      return false;
      
    }
    if(this.state.Password==="")
    {
      alert("Please Fill All fields")
      return false;
      
    }
    return true;
  }

    saveUser() {
    var data = {
      UserName: this.state.UserName,
      Password: this.state.Password,
      retypePassword : this.state.retypePassword
    };
    

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
        if(response.status === 400){
          console.log("in 400")
          alert("Error Occured");
          this.newEmployee();
        }
      })
      .catch(e => {
        console.log(e);
      });

    
    
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
                    type="text" 
                    value={this.state.UserName}
                    onChange={this.onChangeUserName}
                    name="UserName" 
                    id="UserName" placeholder="Username"/>
                    <input className="small" 
                    type="password" 
                    value={this.state.Password} 
                    name="Password" 
                    id="Password" 
                    placeholder="password" 
                    onChange={this.onChangePassword}/>
                    <input className="small" 
                    type="password" minLength="6"
                    value={this.state.retypePassword} 
                    name="retypePassword" 
                    id="retypePassword" minLength="6"
                    placeholder="retypepassword" 
                    onChange={this.onChangeretypePassword}/>
                    <button className="btnsubmit" onClick={this.saveUser}>Register</button><br/> 
                    <br />

                {/* </form> */}
            </div>
            
        </div>
        
    )
  }
}