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

var ensureAdmin = function (req, res, next) {
    var err;
    if (req.user.type === "Admin") {
        next();
    } else {
        err = new Error("You don\'t have permission to do that");
        err.status = 401;
        next(err);
    }
};

router.get('/', ensureAuthenticated, ensureAdmin, function (req, res, next) {
    User.findAll()
    .then(function(users) {
        res.send(users);
    });
});

router.get('/:id', ensureAuthenticated, function(req, res, next) {
    User.findById(req.params.id)
    .then(function(user) {
        res.send(user);
    });
});

router.post('/', function(req, res, next) {
    User.create(req.body)
    .then(function(user) {
        res.send(user);
    });
});

router.delete('/:id', function(req, res, next) {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.sendStatus(200);
    });
});

router.put('/:id', function(req, res, next) {
    User.findById(req.params.id)
    .then(function(user) {
        return user.update(req.body);
    })
    .then(function(user) {
        res.send(user);
    });
});