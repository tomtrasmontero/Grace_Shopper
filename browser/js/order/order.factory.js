app.factory('OrderFactory',function($http, $state){

	var OrderFactory = {};
	var orders = [];
	var theorder = {};
	var order = {};
	var cart = {};

	OrderFactory.getAll = function(){
		return $http.get('/api/order')
			.then(function(results){
				angular.copy(results.data, orders);
				return orders;
			})
	}

	OrderFactory.destroy = function(id){
		return $http.delete('/api/order/' + id)
			.then(function(result){
				var idx = orders.findIndex(function(element){
					return element.id === id;
				})
				orders.splice(idx, 1);
				return orders;
			})
	}

	OrderFactory.getOne = function(id){
		return $http.get('/api/order/' + id)
			.then(function(result){
				angular.copy(result.data, theorder);
				return theorder;
			})
	}

	OrderFactory.changeOrderItem = function(id, quantity, index){
		return $http.put('/api/order/' + id + '/' + quantity)
			.then(function(result){
				return result.data;
			})
	}
	
	OrderFactory.deleteItem = function(id, index, orderid){
		return $http.delete('/api/order/orderitem/' + id)
			.then(function(result){
				return OrderFactory.getOne(orderid);
			})
	}


	OrderFactory.updateOrder = function(orderObj){
		return $http.put('/api/order/' + orderObj.id, orderObj)
			.then(function(result){
			})
	}

	OrderFactory.getCart = function(userId){
		return $http.get('/api/order/cart/' + userId)
			.then(function(result){
				angular.copy(result.data, cart);
				return result.data;
			})
	}

	OrderFactory.placeOrder = function(orderId){
		return $http.post('/api/order/place/' + orderId)
		 	.then(function(result){

		 	})
	}

	OrderFactory.submitAddress = function(address, userid, orderid){
	return $http.post('/api/cart/address/' + userid, address)
		.then(function(){
			return OrderFactory.getOne(orderid);
		})
	}

	return OrderFactory;
})