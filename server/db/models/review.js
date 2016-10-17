var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
	content: {
        type: Sequelize.TEXT,
        //validate that the review is not blank
        validate:{
            min: 1
        }
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