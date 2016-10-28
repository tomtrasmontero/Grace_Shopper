'use strict';
var router = require('express').Router();
var Instrument = require('../../../db').models.instrument;
var Review = require('../../../db').models.review;
var User = require('../../../db').models.user;
module.exports = router;

router.get('/', function(req,res,next){
	return Instrument.findAll()
	.then(function(instruments){
		res.send(instruments);
	})
	.catch(next);
});

router.get('/:id', function(req,res,next){
	return Instrument.findOne({
		where:{
			id: req.params.id
		},
		include:[{
			model: Review,
			include: [{
				model: User
			}]
		}]
	})
	.then(function(result){
		res.send(result);
	})
	.catch(next);
});

router.post('/add', function(req,res,next){
	Instrument.create({
		title: req.body.name,
		brand: req.body.brand,
		family: req.body.family,
		type: [req.body.type],
		description: req.body.description,
		price: req.body.price,
		quantity: req.body.quantity
	})
	.then(function(){
		return Instrument.findAll()
	})
	.then(function(instruments){
		res.send(instruments)
	})
	.catch(next);
});

