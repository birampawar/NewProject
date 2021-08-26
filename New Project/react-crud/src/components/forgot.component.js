import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';

export default class Forgot extends Component {
  
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
                <input className="small" type="email" name="email" id="email" placeholder="Enter your email address"></input>
                <input className="small btnsubmit" type="submit" value="Send OTP"></input>
                <input className="small" type="number" name="OTP" id="OTP" placeholder="Enter the OTP you received in email"></input>
                <input className="small btnsubmit" type="submit" value="Verify"></input>
                <input className="small" type="password" name="password" id="password" placeholder="password"></input>
                <input className="small" type="password" name="conpassword" id="conpassword" placeholder="Confirm Password"></input>
                <input className="small btnsubmit" onclick="matchPassword()" type="submit" value="RESET"></input>
            </div>
        </div>
        
    )
   
  }
}