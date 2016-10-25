app.factory('ZCartFactory',function($http, $state, Session, $q, $window){

	var _cart = {
		orderitems: []
	};

	function _addItemRemotely(orderitem) {
		return $http.post('/api/cart/additem/' + orderitem.instrument.id + '/' + orderitem.quantity + '/' + Session.user.id)
		.then(function() {
			return _loadCartRemotely();
		});
	}

	function _addItemLocally(orderitem) {
		return _loadCartLocally()
		.then(function(cart) {
			cart.orderitems.push(orderitem);
			$window.sessionStorage.setItem('cart', JSON.stringify(cart));
		});
	}

	function _deleteItemRemotely(orderitem) {
		return $http.delete('/api/cart/orderitem/' + orderitem.instrument.id)
		.then(function() {
			return _loadCartRemotely();
		});
	}

	function _deleteItemLocally(orderitem) {
		return _loadCartLocally()
		.then(function(cart) {
			var ind = cart.orderitems.findIndex(function(oi){
				console.log("oi is ", oi);
				console.log('orderitem is ', orderitem);
				return oi.instrument.id == orderitem.instrument.id;
			})
			cart.orderitems.splice(ind,1);
			$window.sessionStorage.setItem('cart', JSON.stringify(cart));
		});
	}

	function _loadCartRemotely() {
		return $http.get('/api/cart/cart/' + Session.user.id)
		.then(function(results) {
			angular.copy(results.data, _cart);
			return _cart;
		});
	}

	function _loadCartLocally() {
		var cart = $window.sessionStorage.getItem('cart');
		if (cart)
			cart = JSON.parse(cart);
		else {
			cart = { orderitems: [] };
			$window.sessionStorage.setItem('cart', JSON.stringify(cart));
		}
		angular.copy(cart, _cart);
		var dfd = $q.defer();
		dfd.resolve(_cart);
		return dfd.promise;
	}

	return {

		cart: _cart,
		loadCart: function() {
			if (Session.user)
				return _loadCartRemotely();
			else
				return _loadCartLocally();
		},

		addItem: function(orderitem) {
			if (Session.user)
				return _addItemRemotely(orderitem);
			else
				return _addItemLocally(orderitem);
		},

		deleteItem: function(item) {
			if (Session.user)
				return _deleteItemRemotely(item);
			else
				return _deleteItemLocally(item);
		},

		syncCart: function() {
			var cart = $window.sessionStorage.getItem('cart');
			if (cart) {
				cart = JSON.parse(cart);
				$window.sessionStorage.removeItem('cart');
				var promises = [];
				cart.orderitems.forEach(function(orderitem) {
					promises.push(_addItemRemotely(orderitem));
				});
				return $q.all(promises);
			}

		}

	}

	// 	if (!cart){
	// 		var cart = {};
	// 		cart.orderitems = [];
	// 	}



	


	// return {



	// 	addItem: function(id,qty){
	// 		// console.log('in cart before', cart);
	// 		// if(!cart.hasOwnProperty(id)){
	// 		// 	cart[id] = qty;	
	// 		// }else{
	// 		// 	cart[id] = (cart[id] + qty);
	// 		// }
	// 		// console.log(cart);

	// 		if (Session.user){
	// 			return $http.post('/api/cart/additem/' + id + '/' + qty + '/' + Session.user.id)
	// 				.then(function(result){
	// 					//console.log ("this is what we got " + result);
	// 					//console.log(result);
	// 					//cart.push(result);
	// 				})
	// 		}
	// 		else{
	// 			return $http.get('/api/cart/addguestitem/' + id)
	// 				.then(function(result){
	// 					console.log ("guest added this item");
	// 					console.log(result.data);
	// 					cart.orderitems.push({instrument:result.data, quantity:qty});
	// 					console.log ("cart is");
	// 					console.log (cart);
	// 				})
	// 		}



	// 	},

	// 	placeOrder: function(orderId){
	// 		console.log(orderId);
	// 		return $http.post('/api/cart/place/' + orderId)
	// 		 	.then(function(result){

	// 		 	})
	// 	},

	// 	oneOfThree: function(status){
	// 		if (status === "shipped" || status === "cart" || status === "order")
	// 			return true
	// 		else return false;
	// 	},

	// 	changeOrderItem: function(id, quantity, index, orderitemIndex){
	// 		if (Session.user){
	// 			return $http.put('/api/cart/' + id + '/' + quantity)
	// 				.then(function(result){
	// 					return result.data;
	// 				})
	// 		}
	// 		else{
	// 			//console.log (1);
	// 			cart.orderitems[orderitemIndex].quantity = quantity;
	// 		}

	// 	},
	
	// 	deleteItem: function(id, index, orderid){
	// 		console.log('aaa');
	// 		if (Session.user){
	// 			return $http.delete('/api/cart/orderitem/' + id)
	// 				.then(function(result){


	// 				})
	// 		}
	// 		else{
				// var ind = cart.orderitems.findIndex(function(element){
				// 	return element.instrument.id == id;
				// })
				// cart.orderitems.splice(ind,1);
	// 		}

	// 	},


	// 	updateOrder: function(orderObj){
	// 		console.log(orderObj.id);
	// 		return $http.put('/api/cart/' + orderObj.id, orderObj)
	// 			.then(function(result){
	// 				console.log (result);
	// 			})
	// 	},

	// 	getCart: function(userId){
	// 		console.log (Session);
	// 		console.log("user id is " + userId);
	// 		return $http.get('/api/cart/cart/' + userId)
	// 			.then(function(result){
	// 				angular.copy(result.data, cart);
	// 				console.log ("length is " + cart.orderitems.length);
	// 				return cart;
	// 			})
	// 	},

	// 	guestCart: function(){
	// 		return cart;
	// 	}


	// };

})
.run(function(ZCartFactory, $rootScope, AUTH_EVENTS) {
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
		ZCartFactory.loadCart()
		.then(function() {
			return ZCartFactory.syncCart();
		});
	});
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
		ZCartFactory.loadCart();
	})
	ZCartFactory.loadCart();
})