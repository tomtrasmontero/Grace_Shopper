'use strict';

const express = require('express');
const router = express.Router();
const Instrument = require('../../../db').models.instrument;
const User = require('../../../db').models.user;
const OrderItem = require('../../../db').models.orderitem;
const Order = require('../../../db').models.order;
const Address = require('../../../db').models.address;
module.exports = router;

router.post('/additem/:id/:qty/:userid', function(req,res,next){
	Order.findOrCreate({
		where:{
			userId: req.params.userid,
			status: 'cart'
		}
	})
		.then(function(result){
			OrderItem.findOrCreate({
				where:{				
					orderId: result[0].dataValues.id,
					instrumentId: req.params.id,
				}
					 				
			})
				.then(function (theOrderItem){
					if (theOrderItem[1] === false){
						var newQty = Number(req.params.qty) + Number(theOrderItem[0].dataValues.quantity);

						OrderItem.update({
							quantity: newQty
						},{
							where: {id: theOrderItem[0].dataValues.id}
						})
							.then(function(orderItem){
								res.send(orderItem);
							})
					}
					else if (theOrderItem[1] === true){
						OrderItem.update({
							quantity: req.params.qty
						},{
							where: {id: theOrderItem[0].dataValues.id}
						})
							.then(function(orderItem){
								res.send(orderItem);
							})
					}
				})
		})
})

router.put('/:id/:quantity', function(req,res,next){
	OrderItem.update(
		{
			quantity: req.params.quantity
		},
		{	
			where: {id: req.params.id}
		})
	.catch(next);
});

router.delete('/orderitem/:id', function(req,res,next){
	OrderItem.destroy({
		where:{
			id:req.params.id
		}
	})
		.then(function(result){
			res.sendStatus(200);
		})
});

// router.put('/:id', function(req,res,next){
// 	Promise.all([
// 		Order.update({
// 			status: req.body.status
// 			},{
// 			where:{id: req.params.id}
// 		}),

// 		Address.update({
// 			city: req.body.address.city,
// 			state: req.body.address.state,
// 			zip: req.body.address.zip,
// 			country: req.body.address.country,
// 			line1: req.body.address.line1,
// 			line2: req.body.address.line2,
// 		},{
// 			where:{id: req.body.addressId}
// 		})
// 	])	
// 		.then(function(result){

// 		})
// 		.catch(next);
// });

router.get('/cart/:userid', function(req,res,next){
	Order.findOne({
		where:{
			userId: req.params.userid,
			status: 'cart',
		},
		include:[
			{
				model: User,
				include:[Address],
			},
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

});

router.post('/place/:orderid/:addressid', function(req, res, next){
	Order.update({
		status:'order',
		addressId: req.params.addressid,
	},{
		where: {id: req.params.orderid}
	})
		.then(function(result){
			res.send(result);
		})
});


router.post('/address/:id', function(req, res, next){
	Address.create({
		line1: req.body.line1,
		line2: req.body.line2,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		country: req.body.country,
		userId: req.params.id
	})
		.then(function(result){
			res.send (result.dataValues);
		})
		.catch(next);
})


router.delete('/address/:id', function(req, res, next){
	Address.destroy({
		where:{
			id: req.params.id
		}
	})
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
})

