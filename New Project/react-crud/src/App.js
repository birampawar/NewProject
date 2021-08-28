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
        <div className="container mt-3">
         { this.state.forgot == true ? 
         <Forgot /> : 
         this.state.Type === "employee" ?
          <Update dislplayHeader={true} propobj={this.state.EMPID} /> 
          : this.state.Type === "HR" ?
           <Search propObj={this.state.Type}/> 
           : this.state.Type === "Admin" ?
            <Admin propObj={this.state.Type}/> :
             <Home handleChange = {this.handleChange} handleForgot={this.handleForgot}/>}
        </div>
    );
  }
}

export default App;