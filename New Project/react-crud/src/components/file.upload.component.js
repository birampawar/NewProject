import React, { Component } from "react";
import '../css/main.css';
import axios from 'axios';
<<<<<<< Updated upstream
 
export default class Upload extends Component {
=======
import EmployeeDataService from '../services/employee.service' 
export default class FUpload extends Component {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          "myFile",
=======
          "file",
>>>>>>> Stashed changes
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
<<<<<<< Updated upstream
        axios.post("api/uploadfile", formData);
=======
        EmployeeDataService.uploadFile(formData)
        .then(response => {
            alert("File Uploaded Successfully");
        })
        console.log("uploaded");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      
>>>>>>> Stashed changes
        render() {
            return (
              <div >
                  <div className="search">
<<<<<<< Updated upstream
                      <input className="small" type="file" name="file" onChange={this.onFileChange} />
=======
                  
                      <input className="small" type="file" multiple accept="image/*" name="file" onChange={this.onFileChange} />
>>>>>>> Stashed changes
                      <button className=" btnsubmit" onClick={this.onFileUpload}>Upload</button>
                  </div>
                {this.fileData()}
              </div>
            );
  }
}