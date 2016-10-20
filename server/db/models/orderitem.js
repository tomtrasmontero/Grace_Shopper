var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('orderitem', {
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    },
    tax: {
        type: Sequelize.STRING
    }
});

