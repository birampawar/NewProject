import React, { Component } from "react";
import '../css/main.css';
import axios from 'axios';
import EmployeeDataService from '../services/employee.service' 
export default class Upload extends Component {
  constructor(props){
    super(props)
    this.onFileChange = this.onFileChange.bind(this);
    this.state = {
      selectedFile: null
    }
  }
  onFileChange(event){
    this.setState(
      { selectedFile: event.target.files[0] }
    );
  }
    
    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
          "file",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        EmployeeDataService.uploadFile(formData)
        .then(response => {
            alert("File Uploaded Successfully");
        })
        console.log("uploaded");
      };

      fileData = () => {
      if (this.state.selectedFile) {
           return (
            <div className="search">
              <h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            {/* <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p> */}
            </div>
          );
        } else {
          return (
            <div className="search">
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      
        render() {
            return (
              <div >
                  <div className="search">
                      <input className="small" type="file" multiple accept="" name="file" onChange={this.onFileChange} />
                      <button className=" btnsubmit" onClick={this.onFileUpload}>Upload</button>
                  </div>
                {this.fileData()}
              </div>
            );
  }
}