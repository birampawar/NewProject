// const { employees } = require("../models/index.js");

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const hr=require("../controllers/hr.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", employees.create);
    router.post("/login", employees.login);
    router.post("/registerhr",hr.create);
    router.get("/getAllData", employees.findAll);
    router.post("/search", employees.findSkills);
    router.get("/getData/:id", employees.findOne);
    router.put("/update/:id", employees.update);
    router.delete("/delete/:id", employees.delete);
    router.post("/reset", employees.reset);
    router.post("/resetPassword", employees.resetPassword);
    router.post("/uploadFile",employees.uploadFile);
  
    
  
    app.use('/api/employees', router);
  };