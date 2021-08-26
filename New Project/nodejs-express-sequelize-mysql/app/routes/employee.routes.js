// const { employees } = require("../models/index.js");

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const hr=require("../controllers/hr.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/register", employees.create);
    router.post("/login", employees.login);
    // Retrieve all Tutorials
    router.post("/registerhr",hr.create);
    router.get("/getAllData", employees.findAll);
  
    // Retrieve all published Tutorials
    router.post("/search", employees.findSkills);
  
    // Retrieve a single Tutorial with id
    router.get("/getData/:id", employees.findOne);
  
    // Update a Tutorial with id
    router.put("/update/:id", employees.update);
  
    // Delete a employee with id
    router.delete("/delete/:id", employees.delete);
  
    
  
    app.use('/api/employees', router);
  };