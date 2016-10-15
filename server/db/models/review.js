var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
	product: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATEONLY
    },
    title: {
        type: Sequelize.STRING
    }
});