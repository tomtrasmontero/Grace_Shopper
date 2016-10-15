'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var User = require('../../../db').models.user;
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    var err;
    if (req.isAuthenticated()) {
        next();
    } else {
        err = new Error('You must be logged in.');
        err.status = 401;
        next(err);
    }
};

router.get('/', ensureAuthenticated, function (req, res) {
    return User.findAll()
    .then(function(users) {
        res.send(users);
    });
});