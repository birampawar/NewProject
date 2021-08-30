import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import usericon from "../images/add-user.jpg"
import listicon from "../images/list-icon.png"
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import AddHr from "./add.hr.component";
import Search from "./search.component";
import Header from "./header";
import Import from "./file.import.component";
export default class Admin extends Component {
  constructor(props){
    super(props);
    this.onAddHR = this.onAddHR.bind(this);
    this.onShowList = this.onShowList.bind(this);
    this.onShowUpload = this.onShowUpload.bind(this);

    this.state = {
      isList:true,
      isHr:false,
      isUpload:false
    };
  } 
  
  onShowList(e)
  {
    console.log("In add hr")
    this.setState({
      isList : false,
      isHr:true,
      isUpload:false
    })
  }
  onAddHR(e)
  {
    console.log("In add hr")
    this.setState({
      isList : true,
      isHr:false,
      isUpload:false
    })
  }
  onShowUpload(e)
  {
    
    this.setState({
      isList : false,
      isHr:false,
      isUpload:true
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
                <button className="tabs btn-primary" onClick={this.onShowUpload}>Import</button>
                {this.state.isHr ?  <AddHr /> : null}
                {this.state.isUpload ?  <Import /> : null}
                {this.state.isList?<Search propObj="Admin"/>:null}

            </div>
        </div>
        
    )
    
  }
}