app.factory('ZCartFactory',function($http, $state, Session, $q, $window){

	var _cart = {
		orderitems: [],
	};

	function _changeOrderItem(id, quantity, index, orderitemIndex){
		if (Session.user){
			return $http.put('/api/cart/' + id + '/' + quantity)
				.then(function(result){
					return result.data;
				})
		}
		else{
			_cart.orderitems[orderitemIndex].quantity = quantity;
		}
	}

	function _getTotal(items){
		var total = 0;

		for (var i=0; i<items.length; i++){
			total = items[i].quantity * items[i].instrument.price + total;
		}

		return total;
	}

	function _emptyCart() {
		var cart = {
			orderitems: []
		};
		angular.copy(cart, _cart);
		var dfd = $q.defer();
		dfd.resolve(_cart);
		return dfd.promise;
	}

	function _changeQuantityLocally(itemid, quantity, orderid, orderitemIndex){
		_cart.orderitems[orderitemIndex] = quantity;
		return _loadCartLocally();
	}

	function _submitAddress(address, userid){
		return $http.post('/api/cart/address/' + userid, address)
			.then(function(){
				return _loadCartRemotely();
			})
	}

	function _deleteAddress(id){
		return $http.delete('/api/cart/address/' + id)
			.then(function(){
				return _loadCartRemotely();
			})
	}

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
		return $http.delete('/api/cart/orderitem/' + orderitem.id)
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
			if(results.data){
				angular.copy(results.data, _cart);
			}
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

		},

		placeOrder: function(orderId, addressId){
			var that = this;
			return $http.post('/api/cart/place/' + orderId + '/' + addressId)
			.then(function() {
				return _emptyCart();
			})
			.then(function() {
				return that.loadCart();
			});
		},


		submitAddress: _submitAddress,

		deleteAddress: _deleteAddress,

		changeOrderItem: _changeOrderItem,

		getTotal: _getTotal,

		changeQuantityLocally: _changeQuantityLocally,

	}
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