'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Address = require('./models/address');
var Users = require('./models/users');
var Review = require('./models/review');
var Order = require('./models/order');
var OrderItem = require('./models/orderitem');
var Instrument = require('./models/instrument');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

