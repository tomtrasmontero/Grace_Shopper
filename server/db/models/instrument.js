var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('instrument', {
	title: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    family: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

