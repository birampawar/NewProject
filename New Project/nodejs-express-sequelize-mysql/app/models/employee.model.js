module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      UserName: {
        type: Sequelize.STRING
      },
      EmailId: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Skillsets: {
        type: Sequelize.STRING
      },
      Domain: {
        type: Sequelize.STRING
      },
      Tools: {
        type: Sequelize.STRING
      },
      Experience: {
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };