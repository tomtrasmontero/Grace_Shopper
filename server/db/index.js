'use strict';
var db = require('./_db');

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');

var Address = require('./models/address');
var Review = require('./models/review');
var Order = require('./models/order');
var OrderItem = require('./models/orderitem');
var Instrument = require('./models/instrument');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.hasMany(Address);
User.hasMany(Review);
User.hasMany(Order);
Order.hasMany(OrderItem);
Instrument.hasMany(Review);
Instrument.hasMany(OrderItem);

module.exports = {
	db: db,
	models: {
		User: User,
		Address: Address,
		Review: Review,
		Order: Order,
		OrderItem: OrderItem,
		Instrument: Instrument
	}
};
