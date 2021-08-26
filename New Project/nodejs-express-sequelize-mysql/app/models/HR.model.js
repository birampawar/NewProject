module.exports = (sequelize, Sequelize) => {
    const HR = sequelize.define("HR", {
      UserName: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Domain:{
          type :Sequelize.STRING
      }
    });
  
    return HR;
  };