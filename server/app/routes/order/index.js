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

router.put('/:id/:quantity', function(req,res,next){


	OrderItem.update(
		{
			quantity: req.params.quantity
		},
		{	
			where: {id: req.params.id}
		},
	)
	.catch(next);
})

router.delete('/orderitem/:id', function(req,res,next){
	OrderItem.destroy({
		where:{
			id:req.params.id
		}
	})
		.then(function(result){
			console.log ('vvv');
			res.sendStatus(200);
		})
})

router.put('/:id', function(req,res,next){
	Promise.all([
		Order.update({
			status: req.body.status
			},{
			where:{id: req.params.id}
		}),

		Address.update({
			city: req.body.address.city,
			state: req.body.address.state,
			zip: req.body.address.zip,
			country: req.body.address.country,
			line1: req.body.address.line1,
			line2: req.body.address.line2,
		},{
			where:{id: req.body.addressId}
		})
	])	
		.then(function(result){
			console.log('aaa');
			console.log ("city is " + req.body.address.city);
		})
		.catch(next);
})

router.get('/cart/:userid', function(req,res,next){
	console.log ("the id is " + req.params.userid);
	Order.findOne({
		where:{
			//id:50,
			userId: req.params.userid,
			status: 'cart',
		},
		include:[
			User,
			{
				model: OrderItem,
				include:[Instrument],
			},
			Address,
		]

	})
	//Order.findById(50)
		.then(function(result){
			console.log("result is " + result);
			res.send(result);
		})
		.catch(next);
	console.log

})

router.post('/place/:orderid', function(req, res, next){
	console.log ("this zzz id is " + req.params.orderid);
	Order.update({
		status:'order'
	},{
		where: {id: req.params.orderid}
	})
		.then(function(result){
			console.log (result);
		})
})