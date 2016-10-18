/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Address = db.model('address');
var Order = db.model('order');
var Instrument = db.model('instrument');
var faker = require('faker');
var Promise = require('sequelize').Promise;
var numUsers = 10;


var seedUsers = function () {

    var users = [
        {
            email: 'obama@gmail.com',
            password: 'potus',
            firstName: 'Donald',
            lastName: 'Trump',
            phone: '888-888-8888',
            type: 'Admin'
        }
    ];

    for (let i = 0; i < numUsers - 1; i++) {
        users.push({
            email: faker.internet.email(),
            password: 'password',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber()
        });
    }

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedAddresses = function() {

    var addresses = [];
    for (let i = 0; i < numUsers; i++) {
        addresses.push({
            line1: faker.address.streetAddress(),
            line2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zip: Number(faker.address.zipCode().slice(0,5)),
            type: ['billing', 'shipping'][Math.round(Math.random())],
            country: "US",
            userId: [...Array(numUsers + 1).keys()].slice(1)[Math.floor(Math.random() * numUsers)]
        });
    }

    var creatingAddresses = addresses.map(function(addrObj) {
        return Address.create(addrObj);
    });

    return Promise.all(creatingAddresses);

};

var seedOrders = function() {

    var randomDate = function(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    var orders = [];
    for (let i = 0; i < numUsers; i++) {

        let isPlaced = [false, true][[Math.round(Math.random())]]

        orders.push({
            status: (isPlaced? 'order': 'cart'),
            orderDate: (isPlaced? randomDate(new Date(2012, 0, 1), new Date()): null),
            userId: [...Array(numUsers + 1).keys()].slice(1)[Math.floor(Math.random() * numUsers)]
        });
    }

    var creatingOrders = orders.map(function(orderObj) {
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders);

};

var seedInstruments = function() {

    var instruments = [];
    for (let i = 0; i < numUsers; i++) {

        instruments.push({
            title: "title" + (i+1),
            brand: "brand" + (i+1),
            price: (Math.random()*100.00).toFixed(2),
            family: "family" + (i+1),
            type: "type" + (i+1),
            description: faker.company.bs()
        });
    }

    var creatingInstruments = instruments.map(function(instrumentObj) {
        return Instrument.create(instrumentObj);
    });

    return Promise.all(creatingInstruments);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function() {
        return Promise.all([
            seedAddresses(),
            seedOrders(),
            seedInstruments()
            ]);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });




module.exports = {
        seedUsers: seedUsers,
        seedAddresses: seedAddresses,
        seedOrders: seedOrders,
        seedInstruments: seedInstruments,
}
