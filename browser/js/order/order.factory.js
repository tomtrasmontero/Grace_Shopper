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
				console.log ('orders are ' + orders);
				console.log(orders[1]);
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
				console.log("the order is fukn is " + theorder.id);
				console.log ("the order is " + result.data['id']);
				return theorder;
			})
	}

	OrderFactory.oneOfThree = function(status){
		if (status === "shipped" || status === "cart" || status === "order")
			return true
		else return false;
	}

	OrderFactory.changeOrderItem = function(id, quantity, index){
		return $http.put('/api/order/' + id + '/' + quantity)
			.then(function(result){
				console.log("after changed quantity");
				return result.data;
			})
	}
	
	OrderFactory.deleteItem = function(id, index, orderid){
		console.log('aaa');
		return $http.delete('/api/order/orderitem/' + id)
			.then(function(result){


			})
	}


	OrderFactory.updateOrder = function(orderObj){
		console.log(orderObj.id);
		return $http.put('/api/order/' + orderObj.id, orderObj)
			.then(function(result){
				console.log (result);
			})
	}

	OrderFactory.getCart = function(userId){
		console.log("user id is " + userId);
		return $http.get('/api/order/cart/' + userId)
			.then(function(result){
				angular.copy(result.data, cart);
				return result.data;
			})
	}

	OrderFactory.placeOrder = function(orderId){
		console.log(orderId);
		return $http.post('/api/order/place/' + orderId)
		 	.then(function(result){

		 	})
	}

	return OrderFactory;

})