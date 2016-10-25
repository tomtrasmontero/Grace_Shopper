app.factory('ZCartFactory',function($http, $state, Session){


	var cart = {};

	


	return {
		addItem: function(id,qty){
			// console.log('in cart before', cart);
			// if(!cart.hasOwnProperty(id)){
			// 	cart[id] = qty;	
			// }else{
			// 	cart[id] = (cart[id] + qty);
			// }
			// console.log(cart);
			return $http.post('/api/cart/additem/' + id + '/' + qty + '/' + Session.user.id)
				.then(function(result){
					console.log ("this is what we got " + result);
					console.log(result);
					//cart.push(result);
				})


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

		changeOrderItem: function(id, quantity, index){
			return $http.put('/api/cart/' + id + '/' + quantity)
				.then(function(result){
					return result.data;
				})
		},
	
		deleteItem: function(id, index, orderid){
			console.log('aaa');
			return $http.delete('/api/cart/orderitem/' + id)
				.then(function(result){


				})
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
					return result.data;
				})
		}




	};

});