const db = require("../models");
//const Employee = db.employees;
const HR = db.HRs;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
//const HR = require("../models/HR.model");
const saltRounds = 10;

exports.create = (req, res) => {
    const password = req.body.Password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log("hash",err);
      }
    const hr = {
      UserName: req.body.UserName,
      Password: hash,
      Domain: req.body.Domain,
    };
    HR.create(hr).then(data => {
        res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
          message:
            err.message || "Some error occurred while Registering an HR user."
    });
  });
 });
  
};
