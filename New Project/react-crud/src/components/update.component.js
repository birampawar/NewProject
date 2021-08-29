import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../css/main.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Header from "./header";
export default class Update extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmailId = this.onChangeEmailId.bind(this);
        this.onChangeSkillsets = this.onChangeSkillsets.bind(this);
        this.onChangeTools = this.onChangeTools.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);

        this.saveUser = this.saveUser.bind(this);
      console.log("in constructor",this.props.propobj);
        this.state = {
          id: this.props.propobj,
          UserName: "",
          EmailId: "", 
          Skillsets: "",
          Tools:"",
          Domain:"",
          Experience:"",
          submitted: false,
        };
      }
    
    componentDidMount(){
        console.log("didmount",this.state.id)
        EmployeeDataService.get(this.state.id)
        .then(res => {
            this.setState({
                UserName: res.data.UserName,
                EmailId :res.data.EmailId,
                Skillsets:res.data.Skillsets,
                Tools:res.data.Tools,
                Domain:res.data.Domain,
                Experience:res.data.Experience,
            })
            console.log(res.data);
        }).catch(e =>{
            console.log(e)
        })
    }
    
    onChangeUserName(e) {
          console.log("Username called"+e.target.value);
        this.setState({
          UserName: e.target.value
        });
      }
    
      onChangeEmailId(e) {
        this.setState({
          EmailId: e.target.value
        });
      }
    
      onChangeSkillsets(e) {
        this.setState({
          Skillsets: e.target.value
        });
      }

      onChangeTools(e) {
        this.setState({
          Tools: e.target.value
        });
      }

      onChangeDomain(e) {
        this.setState({
          Domain: e.target.value
        });
      }

      onChangeExperience(e) {
        this.setState({
          Experience: e.target.value
        });
      }
    
    
        saveUser() {
        var data = {
          UserName: this.state.UserName,
          EmailId :this.state.EmailId,
          Skillsets:this.state.Skillsets,
          Tools:this.state.Tools,
          Domain:this.state.Domain,
          Experience:this.state.Experience,
        };
    
        EmployeeDataService.update(this.state.id,data)
          .then(response => {
            this.setState({
                UserName: this.state.UserName,
                EmailId :this.state.EmailId,
                Skillsets:this.state.Skillsets,
                Tools:this.state.Tools,
                Domain:this.state.Domain,
                Experience:this.state.Experience,
                submitted:true
            });
            console.log(response.data);
            if(response.status === 200){
              alert("Data Uploaded Successfully");
              this.props.handleChange(true);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      newEmployee() {
        this.setState({
          id: null,
          UserName: "",
          Password: "",
          retypePassword:"",
          submitted: false
        });
      }
  
  render() {

    return (   
      
        <div> 
          {this.props.dislplayHeader ? <Header  /> : null}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
            />
            {/* Main Content */}
            <center>
            <div className="updatepanel" >
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-user fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input type="text" 
                  class="prop" 
                  id="UserName"
                  value= {this.state.UserName}
                  name="UserName"
                  placeholder="username"
                  onChange={this.onChangeUserName} 
                  ></input>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input 
                  type="email" 
                  class="prop" 
                  id="EmailId"
                  placeholder="Email Id"
                  value= {this.state.EmailId}
                  name="EmailId"
                  onChange={this.onChangeEmailId}></input>
                </div>
              </div>
              {/* <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-key fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input type="password" class="prop" id="inputPassword"></input>
                </div>
              </div> */}
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-slack fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input 
                  type="text" 
                  class="prop" 
                  id="Tools"
                  value= {this.state.Tools}
                  name="Tools"
                  placeholder="Tools"
                  onChange={this.onChangeTools}></input>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-cogs fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input 
                  type="text" 
                  class="prop" 
                  id="Domain"
                  value= {this.state.Domain}
                  name="Domain"
                  placeholder="Domain"
                  onChange={this.onChangeDomain}></input>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-area-chart fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input 
                  type="text" 
                  class="prop" 
                  id="Skillsets"
                  value= {this.state.Skillsets}
                  name="Skillsets"
                  placeholder="Skillsets"
                  onChange={this.onChangeSkillsets}></input>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"><i class="fa fa-flask fa-2x" aria-hidden="true"></i></label>
                <div class="col-sm-10">
                  <input 
                  type="text" 
                  class="prop" 
                  id="Experience"
                  value= {this.state.Experience}
                  name="Experience"
                  placeholder="Experience"
                  onChange={this.onChangeExperience}></input>
                </div>
              </div>

              <input 
              className="small btnsubmit" 
              type="submit" 
              value="Update"
              onClick={this.saveUser}></input>
            </div>
            </center>
        </div>
        
    )
    
  }
}