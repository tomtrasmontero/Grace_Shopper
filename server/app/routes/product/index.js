'use strict';
var router = require('express').Router();
var Instrument = require('../../../db').models.instrument;
module.exports = router;

router.get('/', function(req,res,next){
	return Instrument.findAll()
	.then(function(instruments){
		res.send(instruments);
	});
});

