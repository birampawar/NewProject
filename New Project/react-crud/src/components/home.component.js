import React, { Component } from "react";
import '../css/main.css';
import Login from "./login.component";
import Register from "./register.component";
export default class Home extends Component {
  constructor(props){
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);

    this.state = {
      status:false
    };
  } 
  
  onLogin(e)
  {
    console.log("In add hr")
    this.setState({
      status : false
    })
  }
  
  onRegister(e)
  {
    console.log("In add hr")
    this.setState({
      status:true
    })
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
            <div className="container adashboard">
              {/* <BrowserRouter> */}
                <button className="tabs" onClick={this.onLogin}>Login</button>
                <button className="tabs" onClick={this.onRegister}>Register</button>
                {this.state.status ?  <Register /> : <Login/>}
                
            </div>
        </div>
        
    )
    
  }
}