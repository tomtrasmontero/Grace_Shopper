var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('address', {
    line1: {
        type: Sequelize.STRING
    },
    line2: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
});