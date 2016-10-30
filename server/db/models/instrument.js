var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('instrument', {
	title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    family: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    quantity: {
        type: Sequelize.INTEGER
    }

});

