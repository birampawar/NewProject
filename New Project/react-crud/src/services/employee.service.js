import http from "../http-common";

class EmployeeDataService {
  getAll() {
    return http.get("/employees/getAllData");
  }

  get(id) {
    return http.get(`/employees/getData/${id}`);
  }

  create(data) {
    return http.post("/employees/register", data);
  }

  login(data) {
    return http.post("/employees/login", data);
  }

  registerhr(data){
    return http.post("/employees/registerhr",data);
  }

  update(id, data) {
    return http.put(`/employees/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/delete/${id}`);
  }

  findSkills(data) {
    return http.post("/employees/search",data);
  }

  reset(data){
    return http.post("/employees/reset",data);
  }

  resetPassword(data){
    return http.post("employees/resetPassword",data);
  }

  uploadFile(data){
    return http.post("employees/uploadFile",data);
  }
}

export default new EmployeeDataService();