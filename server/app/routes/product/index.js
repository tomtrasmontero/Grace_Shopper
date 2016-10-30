'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Instrument = db.models.instrument;
var Review = db.models.review;
var User = db.models.user;

module.exports = router;

router.get('/', function(req,res,next){
	return Instrument.findAll()
	.then(function(instruments){
		res.send(instruments);
	})
	.catch(next);
});

router.get('/bestsellers', function(req, res, next) {
	db.query("SELECT * FROM instruments JOIN (SELECT \"instrumentId\", COUNT(\"instrumentId\") from orderitems GROUP BY \"instrumentId\") AS t ON t.\"instrumentId\" = instruments.id ORDER BY \"count\" DESC LIMIT 100")
	.then(function(results) {
		res.send(results[0]);
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

router.put('/edit', function(req,res,next){
	console.log(req.body);
	Instrument.update(
	{
		title: req.body.title,
		brand: req.body.brand,
		price: req.body.price,
		family: req.body.family,
		type: req.body.type,
		description: req.body.description,
		quantity: req.body.quantity,
		image: req.body.image
	},{
		where: {id: req.body.id}
	})
	.then(function(){
		res.sendStatus(200);
	})
	.catch(next);
});





