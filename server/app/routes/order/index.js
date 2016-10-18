'use strict';

const express = require('express');
const router = express.Router();
const Instrument = require('../../../db').models.instrument;
const User = require('../../../db').models.user;
const OrderItem = require('../../../db').models.orderitem;
const Order = require('../../../db').models.order;
const Address = require('../../../db').models.address;
module.exports = router;


router.get('/', function(req, res, next){
	Order.findAll({
		include:[
			User,
			{
				model: OrderItem,
				include:[Instrument],
			},
			Address,
		]
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
});

router.delete('/:id', function(req, res, next){
	Order.destroy({
		where:{
			id: req.params.id
		}
	})
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
})

router.get('/:id', function(req, res, next){

	Order.findById(req.params.id, {
		include:[
			User,
			{
				model: OrderItem,
				include:[Instrument],
			},
			Address,
		]
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})