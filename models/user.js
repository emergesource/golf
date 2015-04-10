var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING
  }, {
      classMethods: {
        generateHash: function(password) {
          return bcrypt.hashSync( password, bcrypt.genSaltSync(10), null);
        },
      },
      instanceMethods: {
        authenticate: function(password) {
          return bcrypt.compareSync(password, this.password); 
        },
      }
  });
  return User;
};
