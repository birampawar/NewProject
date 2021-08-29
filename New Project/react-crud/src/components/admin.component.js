import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import usericon from "../images/add-user.jpg"
import listicon from "../images/list-icon.png"
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import AddHr from "./add.hr.component";
import Search from "./search.component";
import Header from "./header";
export default class Admin extends Component {
  constructor(props){
    super(props);
    this.onAddHR = this.onAddHR.bind(this);
    this.onShowList = this.onShowList.bind(this);

    this.state = {
      status:true
    };
  } 
  
  onAddHR(e)
  {
    console.log("In add hr")
    this.setState({
      status : false
    })
  }
  
  onShowList(e)
  {
    console.log("In add hr")
    this.setState({
      status:true
    })
  }

  render() {
    return (      
        <div>
          <Header />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
            />
            {/* Main Content */}
            <div className="container adashboard">
              {/* <BrowserRouter> */}
                <button className="tabs btn-primary" onClick={this.onAddHR}>List</button>
                <button className="tabs btn-primary" onClick={this.onShowList}>Add</button>
                {this.state.status ?  <AddHr /> : <Search propObj="Admin"/>}
                
            </div>
        </div>
        
    )
    
  }
}