import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import profilepic from '../images/photo1.png'
import '../css/list.css'
import { Link } from "react-router-dom";
import Update from "./update.component";
import Header from "./header";
import reactDom from "react-dom";
export default class Search extends Component {
  constructor(props) {
        super(props);        
        this.OnChangeSearchskill = this.OnChangeSearchskill.bind(this);
        this.searchskill = this.searchskill.bind(this);
        this.showDetails =  this.showDetails.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.EditEmployee = this.EditEmployee.bind(this);
        this.DeleteEmployee = this.DeleteEmployee.bind(this);

        this.state={
            employees:[],
            currentEmployee: null,
            currentIndex: -1,
            search :"",
            empid : null,
            isEdit:false,
        }
    };
    showDetails()
    {
      const currentEmployee=this.state.currentEmployee;
      return(<React.Fragment>
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
      </React.Fragment>)
    }

    DeleteEmployee(empid){
      EmployeeDataService.delete(empid)
      .then(response => {
        console.log(response.data);
      })
      alert("Employee Data Deleted Successfully");
    }

    OnChangeSearchskill(e) {
    this.setState({
      search: e.target.value
    });
  }

  setActiveEmployee(employee, index) {
    console.log("setActive");
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
      isEdit:false
    });
  }


  EditEmployee(employee,index){
    console.log("ineditemployee",employee.id)
    this.setState({
      currentEmployee:employee,
      currentIndex:index,
      isEdit:true
    })
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
        if(this.state.employees.length<1){
          alert("No Data Found");
        }
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
        <div className="container">

          <div className="row">
              <div className="col-sm-5" >
                  <ul className="list-group" type="none">
                      <li><input type="text"className="prop" 
                      placeholder="Search by Skills, Tools, Domain" 
                      value={search} onChange={this.OnChangeSearchskill}></input> <button onClick={this.searchskill} className="btn searchbtn btn-primary">Search</button></li>
                  </ul>
                  
                  <ul className="list-group">
                      {employees && employees.map((employee, index) => (
                          <li className={"list-group-item " +(index === currentIndex ? "active" : "")}>
                         <div className="row" >
                              <div className="col-8" onClick={() => this.setActiveEmployee(employee, index)}key={index}>
                              <b> {employee.UserName} </b>  <p>{employee.Domain}</p>
                              </div>
                              {this.props.propObj==="Admin"?
                              <div className="col right">
                                
                                <button type="button" class="btn listbtn btn-success" onClick={() => this.EditEmployee(employee,index)}><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></button>
                                <button type="button" class="btn listbtn btn-danger" onClick={() => {if (window.confirm('Do you want to delete this employee?')) this.DeleteEmployee(employee.id)}}><i className="fa fa-trash fa-lg"></i></button>

                              </div>
                              : <></>}
                            </div>

                          </li>

                      ))}
                  </ul>
              </div>
              {/* {this.showDetails()} */}

                        {this.state.isEdit ? <div className="col"><Update displayHeader={false} propobj={this.state.currentEmployee.id} /></div> : this.showDetails()}
          </div>
            </div>
          
      </div>
    );
  }
}