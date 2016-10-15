var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = {
	models:{
		OrderItem: OrderItem
	}
};

var OrderItem = db.define('orderItem', {
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

