import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import profilepic from '../images/photo1.jpg'
import '../css/list.css'
import { Link } from "react-router-dom";
import Update from "./update.component";
import Header from "./header";
export default class Search extends Component {
  constructor(props) {
        super(props);        
        this.OnChangeSearchskill = this.OnChangeSearchskill.bind(this);
        this.searchskill = this.searchskill.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.validateSearch = this.validateSearch.bind(this);
        this.state={
            employees:[],
            currentEmployee: null,
            currentIndex: -1,
            search :"",
            empid : null
        }
    };

    OnChangeSearchskill(e) {
    this.setState({
      search: e.target.value
    });
  }
  validateSearch(){
    if(this.state.search==="")
      {
        alert("Please Fill field")
        return true
        
      }
  }
  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }

  searchskill() {
    var data = {
        search: this.state.search
      };
      
        EmployeeDataService.findSkills(data)
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
     
    
  }
  
  render() {
    const { search, employees, currentEmployee, currentIndex } = this.state;
    console.log("in Search Page");

    return (
      <div action="">
        {this.props.propObj === "Admin" ?<></>:<Header />}
          <div className="row" >
              <div className="col-5" >
                  <ul className="list-group" type="none">
                      <li><input type="text"className="prop" 
                      placeholder="Search by Skills, Tools, Domain" 
                      value={search}onChange={this.OnChangeSearchskill}></input> 
                      <button onClick={this.searchskill,this.validateSearch} className="btn searchbtn btn-primary">Search</button>
                      </li>
                  </ul>
                  
                  <ul className="list-group">
                      {employees && employees.map((employee, index) => (
                          <li className={"list-group-item " +(index === currentIndex ? "active" : "")}onClick={() => this.setActiveEmployee(employee, index)}key={index}>
                         <div className="row">
                              <div className="col-8">
                              <b> {employee.UserName} </b>  <p>{employee.Domain}</p>
                              </div>
                              {this.props.propObj==="Admin"?
                              <div className="col right">
                                
                                <button type="button" class="btn listbtn btn-success" ><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></button>
                                <button type="button" class="btn listbtn btn-danger"><i className="fa fa-trash fa-2x"></i></button>

                              </div>
                              : <></>}
                            </div>
                          </li>
                      ))}
                  </ul>
              </div>
              {currentEmployee ? (
              <div className="col details">
                  <div className="row">
                      <div className="col-3">
                          <img className="avatar" src={profilepic} alt=""></img>
                      </div>
                      <div className="col">
                          <h3> {currentEmployee.EmailId} </h3>
                          <h6>{currentEmployee.Id}</h6>
                          <h6>{currentEmployee.UserName}</h6>
                          <h6>{currentEmployee.Domain}</h6>
                      </div>
                  </div>
                  <br/>
                  <div className="row" >
                      <div className="col-4">
                          <ul type="none">
                              <li> <b> <h5> Skills </h5> </b> </li>
                                  <ul>
                                      <li>{currentEmployee.Skillsets}</li>
                                  </ul>
                              <li> <b> <h5> Tools </h5> </b> </li>
                                  <ul>
                                      <li>{currentEmployee.Tools}</li>
                                  </ul>
                              <li> <b> <h5> Domain </h5> </b> </li>
                                  <ul>
                                      <li>{currentEmployee.Domain}</li>
                                  </ul>
                              <li> <b> <h5> Experience </h5> </b> </li>
                                  <ul>
                                      <li>{currentEmployee.Experience}</li>
                                  </ul>
                          </ul>
                      </div>
                      <div className="col">
                          <ul type="none">
                              <li> <b> <h5> Project Title </h5> </b> </li>
                                  <ul>
                                      <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta porro similique eligendi minus recusandae, deleniti quaerat aut officiis commodi veritatis magnam odio, unde natus omnis assumenda explicabo amet molestiae error?  </li>
                                  </ul>
                          </ul>
                      </div>
                  </div>
                  {/* <center><button className="btn btn-primary">Edit</button></center> */}
              </div>
              ): (
                  <div className="col details" >
                    <br/>
                    <p></p>
                  </div>
                )}
              
          </div>
          
      </div>
    );
  }
}