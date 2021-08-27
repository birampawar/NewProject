import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';

export default class Forgot extends Component {
  constructor(props){
    super(props);
    this.onChangeEmain = this.onChangeEmain.bind(this);
    this.onChangeOTP = this.onChangeOTP.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCPassword = this.onChangeCPassword.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateOTP = this.validateOTP.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state={
      email:'',
      otp:'',
      password:'',
      cpassword:''
    }
    
  }
  onChangeEmain(e)
    {
      this.setState(
        {email : e.target.value}
      )
    }
    onChangeOTP(e)
    {
      this.setState(
        {otp : e.target.value}
      )
    }
    onChangePassword(e)
    {
      this.setState(
        {password : e.target.value}
      )
    }
    onChangeCPassword(e)
    {
      this.setState(
        {cpassword : e.target.value}
      )
    }
    validatePassword(){
      if(this.state.cpassword!== this.state.password)
      {
        alert("password Didn't matched");
        
      }
      if(this.state.password==="")
      {
        alert("Please Fill All fields")
        
      }

    }
    validateOTP(){
      if(this.state.otp==="")
      {
        alert("Please Fill All fields")
        
      }
    }
    validateEmail(){
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.state.email==="")
      {
        alert("Please Fill All fields")
        
      }
      else if(this.state.email.match(mailformat))
      {
        return true;
      }
      else
      {
        alert("You have entered an invalid email address!");
        return false;
      }
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
                <input value={this.state.email} onChange={this.onChangeEmain} className="small" type="email" name="email" id="email" placeholder="Enter your email address"></input>
                <button className="small btnsubmit" onClick={this.validateEmail}>Send Email</button>
                <input value={this.state.otp} onChange={this.onChangeOTP} className="small" type="number" name="OTP" maxLength="4" id="OTP" placeholder="Enter the OTP you received in email"></input>
                <button className="small btnsubmit" onClick={this.validateOTP}>Verify OTP</button>
                <input value={this.state.password} onChange={this.onChangePassword}  className="small" type="password" minLength="6" name="password" id="password" placeholder="password"></input>
                <input value={this.state.cpassword} onChange={this.onChangeCPassword} className="small" type="password" minLength="6" name="conpassword" id="conpassword" placeholder="Confirm Password"></input>
                <button className="small btnsubmit" onClick={this.validatePassword}>Reset</button>
            </div>
            
        </div>
        
    )
   
  }
}