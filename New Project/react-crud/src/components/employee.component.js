import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import usericon from "../images/add-user.jpg"
import listicon from "../images/list-icon.png"
import { BrowserRouter, Link, Redirect } from "react-router-dom";
import Upload from "./file.upload.component";
import AddHr from "./add.hr.component";
import Search from "./search.component";
import Header from "./header";
import Update from "./update.component";
export default class Employee extends Component {
  constructor(props){
    super(props);
    this.onShowList = this.onShowList.bind(this);
    this.onShowUpload = this.onShowUpload.bind(this);

    this.state = {
      isList:true,
      isUpload:false
    };
  } 
  
  onShowList(e)
  {
    console.log("In add hr")
    this.setState({
      isList : true,
      isUpload:false
    })
  }
  onShowUpload(e)
  {
    
    this.setState({
      isList : false,
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
                <button className="tabs btn-primary" onClick={this.onShowList}>Update</button>
                <button className="tabs btn-primary" onClick={this.onShowUpload}>Upload</button>
                {this.state.isUpload ?  <Upload /> : null}
                {this.state.isList?<Update propobj={this.props.propobj}/>:null}

            </div>
        </div>
        
    )
    
  }
}