import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import Header from "./header";
import validator from "validator";

export default class Forgot extends Component {
  constructor(props){
    super(props)
    this.SendOTP = this.SendOTP.bind(this);
    this.OnEmailChange = this.OnEmailChange.bind(this);
    this.OnChangeEnterOTP = this.OnChangeEnterOTP.bind(this);
    this.CheckOTP = this.CheckOTP.bind(this);
    this.OnChangePassword = this.OnChangePassword.bind(this);
    this.OnChangeretypePassword = this.OnChangeretypePassword.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.OnChangeUserName = this.OnChangeUserName.bind(this);

    this.state = {
      UserName:"",
      email : "",
      isOTPSent : true,
      OTP : null,
      EnteredOTP : null,
      Password: "",
      retypePassword:"",
      isVerified: false,
      isReset:false
    }
  }
  OnEmailChange(e){
    this.setState({
      email : e.target.value
    })
  }
  
  OnChangeEnterOTP(e){
    this.setState({
      EnteredOTP : e.target.value
    })
  }

  OnChangePassword(e){
    this.setState({
      Password : e.target.value
    })
  }

  OnChangeretypePassword(e){
    this.setState({
      retypePassword : e.target.value
    })
  }
  OnChangeUserName(e){
    this.setState({
      UserName:e.target.value
    })
  }

  SendOTP(){
    var data = {
      UserName:this.state.UserName,
      email : this.state.email
    };

    EmployeeDataService.reset(data)
    .then(response => {
      this.setState({
        OTP:response.data
      })
      console.log(this.state.OTP);
      alert("OTP sent Successfully. Please check you mail");
      this.setState({
        isOTPSent:false,
        isVerified:true
      });

    })
    .catch(e => {
      console.log(e);
    });
  }

  CheckOTP() {
    if(this.state.OTP == this.state.EnteredOTP){
      alert("OTP verification Successfull")
      this.setState({
        isVerified:false,
        isReset:true
      })
    }
    else{
      alert("You Entered Invalid OTP");
    }
  }

  savePassword(){
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
    else{
    if (validator.isStrongPassword(pass, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })){
     
    EmployeeDataService.resetPassword(data)
      .then(response => {
        this.setState({
          Password: response.data.Password,
          retypePassword : response.data.retypePassword,
          submitted: true
        });
        console.log(response.data);
        if(response.status === 200){
          alert("Password Reset Successfully");
          this.props.handleChange(true);
        }
        this.newEmployee();
      })
      .catch(e => {    
        console.log(e);
      });
    }
    else{
      alert("Password must be alphanumeric and must include symbols");
    }
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
           <Header obj={true} handleChange = {this.props.handleChange}/>
            <div  >

              {this.state.isOTPSent ? 
              <div className="search">
            <input required className="small" 
                type="text" 
                name="UserName" 
                id="UserName" 
                onChange={this.OnChangeUserName}
                placeholder="Enter your UserName"></input>
                <input required className="small" 
                type="email" 
                name="email" 
                id="email" 
                onChange={this.OnEmailChange}
                placeholder="Enter your email address"></input> 
                <input required className="small btnsubmit" 
                type="submit" 
                value="Send OTP" 
                onClick={this.SendOTP}></input>
                </div> : null }

                {this.state.isVerified ? 
                <div className="search">
                <input required className="small" 
                type="text" 
                onChange={this.OnChangeEnterOTP}
                name="OTP" maxLength="6" 
                id="OTP" 
                placeholder="Enter the OTP you received in email"></input>
                <input required className="small btnsubmit" 
                type="submit" 
                value="Verify"
                onClick={this.CheckOTP}></input>
                </div>
                : null}

                {this.state.isReset ? 
                <div className="search">
                <input required className="small" 
                type="Password" 
                minLength="8" 
                name="Password" 
                id="Password" 
                onChange={this.OnChangePassword}
                placeholder="Password"></input>
                <input required className="small" 
                type="password" 
                minLength="8" 
                name="retypePassword" 
                id="retypePassword"
                onChange={this.OnChangeretypePassword} 
                placeholder="Confirm Password"
                ></input>
                <input required className="small btnsubmit" 
                onClick={this.savePassword} type="submit" value="RESET"></input>
                </div>
                : null }
            </div>
            
        </div>
        
    )
   
  }
}