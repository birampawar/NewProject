import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from "./components/register.component";
import Login from "./components/login.component"
import Search from "./components/search.component"
import Admin from "./components/admin.component"
import Header from "./components/header"
import AddHr from "./components/add.hr.component"
import Update from "./components/update.component";
import Home from "./components/home.component";
import Forgot from "./components/forgot.component";
import Upload from "./components/file.upload.component";
import Employee from "./components/employee.component";
class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.state = {
      isLogin:false,
      EMPID:"",
      Type:"",
      forgot:false
    }
  }
  handleForgot(){
    this.setState({
      forgot:true
    })
  }
  handleChange(data,ID,Typ){
    console.log("Inside HandleChange");
    console.log(Typ);
    console.log(ID);
    this.setState({
       isLogin:data,
       EMPID:ID,
       Type:Typ
     })
  }
  render() {
    return (
        <div className="">
         { this.state.forgot == true ? 
         <Forgot handleChange = {this.handleChange}/> : 
         this.state.Type === "employee" ?
          <Employee handleChange = {this.handleChange} propobj={this.state.EMPID} /> 
          : this.state.Type === "HR" ?
           <Search handleChange = {this.handleChange} propObj={this.state.Type}/> 
           : this.state.Type === "Admin" ?
            <Admin handleChange = {this.handleChange} propObj={this.state.Type}/> :
             <Home handleChange = {this.handleChange} handleForgot={this.handleForgot}/>}
              
        </div>  
    );
  }
}

export default App;