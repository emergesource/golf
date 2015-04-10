"use strict";
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("course", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Course;
};
