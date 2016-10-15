var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = {
	models:{
		Users: Users
	}
};

var Users = db.define('users1',{
	type: {
        type: Sequelize.STRING,
        defaultValue: "Customer"
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    }
});