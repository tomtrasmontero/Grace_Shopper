app.factory('ZCartFactory',function($http, $state, Session){

		if (!cart){
			var cart = {};
			cart.orderitems = [];
		}



	


	return {



		addItem: function(id,qty){
			// console.log('in cart before', cart);
			// if(!cart.hasOwnProperty(id)){
			// 	cart[id] = qty;	
			// }else{
			// 	cart[id] = (cart[id] + qty);
			// }
			// console.log(cart);

			if (Session.user){
				return $http.post('/api/cart/additem/' + id + '/' + qty + '/' + Session.user.id)
					.then(function(result){
						//console.log ("this is what we got " + result);
						//console.log(result);
						//cart.push(result);
					})
			}
			else{
				return $http.get('/api/cart/addguestitem/' + id)
					.then(function(result){
						console.log ("guest added this item");
						console.log(result.data);
						cart.orderitems.push({instrument:result.data, quantity:qty});
						console.log ("cart is");
						console.log (cart);
					})
			}



		},

		placeOrder: function(orderId){
			console.log(orderId);
			return $http.post('/api/cart/place/' + orderId)
			 	.then(function(result){

			 	})
		},

		oneOfThree: function(status){
			if (status === "shipped" || status === "cart" || status === "order")
				return true
			else return false;
		},

		changeOrderItem: function(id, quantity, index, orderitemIndex){
			if (Session.user){
				return $http.put('/api/cart/' + id + '/' + quantity)
					.then(function(result){
						return result.data;
					})
			}
			else{
				//console.log (1);
				cart.orderitems[orderitemIndex].quantity = quantity;
			}

		},
	
		deleteItem: function(id, index, orderid){
			console.log('aaa');
			if (Session.user){
				return $http.delete('/api/cart/orderitem/' + id)
					.then(function(result){


					})
			}
			else{
				var ind = cart.orderitems.findIndex(function(element){
					return element.instrument.id == id;
				})
				cart.orderitems.splice(ind,1);
			}

		},


		updateOrder: function(orderObj){
			console.log(orderObj.id);
			return $http.put('/api/cart/' + orderObj.id, orderObj)
				.then(function(result){
					console.log (result);
				})
		},

		getCart: function(userId){
			console.log (Session);
			console.log("user id is " + userId);
			return $http.get('/api/cart/cart/' + userId)
				.then(function(result){
					angular.copy(result.data, cart);
					console.log ("length is " + cart.orderitems.length);
					return cart;
				})
		},

		guestCart: function(){
			return cart;
		}


	};

});