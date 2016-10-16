var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
var db = new Sequelize(env.DATABASE_URL, {
  logging: env.LOGGING ? console.log : false,
  native: env.NATIVE
});

console.log(db);
module.exports = db;
