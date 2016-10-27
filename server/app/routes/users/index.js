'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var User = require('../../../db').models.user;
var auth = require('../auth');
var ensureAuthenticated = auth.ensureAuthenticated;
var ensureAdmin = auth.ensureAdmin;
module.exports = router;



router.get('/', ensureAuthenticated, ensureAdmin, function (req, res, next) {
    User.findAll()
    .then(function(users) {
        res.send(users);
    });
});

router.get('/:id', ensureAuthenticated, function(req, res, next) {
    if (req.user.id !== Number(req.params.id) && req.user.type !== "Admin") {
        var err = new Error("Permission denied");
        err.status = 401;
        return next(err);
    }
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