const db = require("../models");
const Employee = db.employees;
const HR = db.HRs;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
//const HR = require("../models/HR.model");
const saltRounds = 10;

// Create and Save a new Tutorial
exports.create = (req, res) => {
      if (req.body.Password  !== req.body.retypePassword) {
        res.status(400).send({
          message: "Password and Retype password are not matching!"
        });
        return;
      }
      const password = req.body.Password;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log("hash",err);
        }
      const employee = {
        UserName: req.body.UserName,
        EmailId: req.body.EmailId,
        Password: hash,
        Skillsets: req.body.Skillsets,
        Domain: req.body.Domain,
        Tools:req.body.Tools,
        Experience:req.body.Experience
      };
      Employee.create(employee).then(data => {
          res.send(data);
      })
      .catch(err =>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while Registering an Employee."
      });
    });
   });
    
};
//Login for user;
exports.login = (req,res) => {
 const {UserName,Password} = req.body;
 console.log(Password);
 console.log(req.body.selectedOption);
 if(req.body.selectedOption == "employee"){
 Employee.findOne({ where: { UserName: {[Op.like]: '%' + req.body.UserName + '%'} } })
    .then(data => {
        bcrypt.compare(Password, data.Password, (error, response) => {
            if (response) {
                res.send(response.data);
              } else {
                res.status(401).send("Wrong username/password combination!" );
              }
        });
      
    })
  }
  else if(req.body.selectedOption == "HR"){
    HR.findOne({ where: { UserName: {[Op.like]: '%' + req.body.UserName + '%'} } })
    .then(data => {
        bcrypt.compare(Password, data.Password, (error, response) => {
            if (response) {
                res.send("Login Successful");
              } else {
                res.status(401).send("Wrong username/password combination!" );
              }
        });
      
    })

  }
  else{
    if(req.body.UserName == "Admin" && req.body.Password == "Admin" ){
      res.status(200).send("Login Successful")
      
    }
    else{
      res.status(400).send("Invalid Credentials");
    }
  }
};
// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Employee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employee."
      });
    });

  
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Employee.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
  
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message:`Data updated Successfully`
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
  
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
  
};


// Find Search by Skills 
exports.findSkills = (req, res) => {
    Employee.findAll({ where: { Skillsets: {[Op.like]: '%' + req.body.search + '%'} } })
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employee."
      });
    });
  
};