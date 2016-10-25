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
			console.log ('result is' + Object.keys(result[0]));
			console.log ('result finally is ' + result[0].dataValues);
			// OrderItem.create({
				
			// 		orderId: result[0].dataValues.id,
			// 		quantity: req.params.qty,
			// 		instrumentId: req.params.id,					 
				
			// })

			OrderItem.findOrCreate({
				where:{				
					orderId: result[0].dataValues.id,
					//quantity: req.params.qty,
					instrumentId: req.params.id,
				}
					 				
			})
			

			// 	.then(function(test){
			// 		res.send(test);
			// 	})
			// })
			



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




		// .then(function(orderItem){
		// 	res.send(orderItem);
		// })
		// .then(function(result){
		// 	console.log (result);
		// })
		//.catch(next);
})

router.get('/addguestitem/:id', function(req,res,next){
	Instrument.findOne({
		where:{
			id: req.params.id
		}
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
			console.log ('vvv');
			res.sendStatus(200);
		})
});

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
});

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

});

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
});

