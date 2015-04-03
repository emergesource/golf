var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('User'), 
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            instanceMethods: {
                generateHash: function(password) {
                    return bcrypt.hasSync(
                        password, 
                        bcrypt.genSaltSync(10), 
                        null
                    );
                },
                authenticate: function(password) {
                    return bcrypt.compareSync(password, this.password); 
                }
            } 
        }
    );
    return User;
};
