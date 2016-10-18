var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
    status: {
        type: Sequelize.STRING
    },
    orderDate: {
        type: Sequelize.DATEONLY
    },
    paidDate: {
        type: Sequelize.DATEONLY
    },
    total: {
        type: Sequelize.INTEGER
    },
    tracking:{
        type: Sequelize.STRING
    },
});