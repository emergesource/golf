"use strict";

module.exports = function(sequelize, DataTypes) {
  var Club = sequelize.define("club", {
    club_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Club;
};
