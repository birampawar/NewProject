const db = require("../models");
const Employee = db.employees;
const HR = db.HRs;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const multer = require("multer");
const reader = require('xlsx')

const saltRounds = 10;

// Create and Save a new Employee
exports.create = (req, res) => {
  if(req.body.Password !== ""){
      if (req.body.Password  !== req.body.retypePassword) {
        res.status(400).send({
          message: "Password and Retype password are not matching!"
        });
        return;
      }
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
      if(data != null){
        bcrypt.compare(Password, data.Password, (error, response) => {
            if (response) {
                res.send(data);
              } else {
                res.status(401).send("Wrong username/password combination!" );
              }
        });
      
    }else{
      res.status(401).send("User Not Found");
    }})
  }
  else if(req.body.selectedOption == "HR"){
    HR.findOne({ where: { UserName: {[Op.like]: '%' + req.body.UserName + '%'} } })
    .then(data => {
      if(data != null){
        bcrypt.compare(Password, data.Password, (error, response) => {
            if (response) {
                res.send("Login Successful");
              } else {
                res.status(401).send("Wrong username/password combination!" );
              }
        });
      }else{
          res.status(401).send("User Not Found");
      }
      
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
    // Employee.findAll({ where: { Skillsets: {[Op.like]: '%' + req.body.search + '%'} } })
    Employee.findAll({ where: { [Op.or] : [{
      Skillsets : {
        [Op.like] : '%' + req.body.search + '%'
      }
    },
    {
      Tools : {
        [Op.like] : '%' + req.body.search + '%'
      }
    },
    {
      Domain : {
        [Op.like] : '%' + req.body.search + '%'
      }
    }
  ]

     } })
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

exports.reset = (req,res) => {
  const id = req.params.id;
  const UserName = req.body.UserName

  Employee.update(req.body, {
    where: { UserName: UserName }
  })
    .then(num => {
      if (num == 1) {
        //send otp to mail
  var num = require('./randomno.js');
  var nodemailer = require('nodemailer');
  var otp= num.randomvalue(6);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'srkukade@mitaoe.ac.in',
        pass: 'Redminote7s'
      }
    });

  var mailOptions = {
    from: 'srkukade@mitaoe.ac.in',
    to: req.body.email,
    subject: 'OTP',
    text: ' Please use below OTP for changing your password.       '
    +otp
  };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    console.log(otp);
    res.status(200).send(otp);
  }
});
        
} else {
  res.send({
    message: `Cannot update Password for Employee with UserName=${UserName}. Maybe Employee was not found!`
  });       
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with UserName=" + UserName
      });
    });
    
}

exports.uploadFile = (req,res) =>{
  console.log("in upload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')
  upload(req, res, (err) => {
    if (err) {
    res.sendStatus(500);
  }
  res.send(req.file);
  });
}

exports.resetPassword = (req,res) => {
  Employee.findOne({ where: { UserName: {[Op.like]: '%' + req.body.UserName + '%'} } })
    .then(data =>{
      console.log(data);
      const password = req.body.Password;
      if(data != null){

        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log("hash",err);
          }
          req.body.Password=hash;
          Employee.update(req.body,{where: { UserName:{[Op.like]: '%'+req.body.UserName+'%'}}})
          .then(num => {
            if (num == 1) {
              res.send({
                message:`Data updated Successfully`
              });
            } else {
              res.send({
                message: `Cannot update Employee. Maybe Employee was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Employee"
            });
        })

      }
        )}
      })
    }