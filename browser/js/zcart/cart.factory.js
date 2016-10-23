app.factory('ZCartFactory',function($http, $state){

// 	var CartFactory = {};
// 	var orders = [];
// 	var theorder = {};
// 	var order = {};
	var cart = {};

// 	CartFactory.oneOfThree = function(status){
// 		if (status === "shipped" || status === "cart" || status === "order")
// 			return true
// 		else return false;
// 	}

// 	CartFactory.changeOrderItem = function(id, quantity, index){
// 		return $http.put('/api/order/' + id + '/' + quantity)
// 			.then(function(result){
// 				return result.data;
// 			})
// 	}
	
// 	CartFactory.deleteItem = function(id, index, orderid){
// 		console.log('aaa');
// 		return $http.delete('/api/order/orderitem/' + id)
// 			.then(function(result){


// 			})
// 	}


// 	CartFactory.updateOrder = function(orderObj){
// 		console.log(orderObj.id);
// 		return $http.put('/api/order/' + orderObj.id, orderObj)
// 			.then(function(result){
// 				console.log (result);
// 			})
// 	}

// 	CartFactory.getCart = function(userId){
// 		console.log("user id is " + userId);
// 		return $http.get('/api/order/cart/' + userId)
// 			.then(function(result){
// 				angular.copy(result.data, cart);
// 				return result.data;
// 			})
// 	}

// 	CartFactory.placeOrder = function(orderId){
// 		console.log(orderId);
// 		return $http.post('/api/order/place/' + orderId)
// 		 	.then(function(result){

// 		 	})
// 	}
	return {
		addItem: function(id,qty){
			console.log('in cart before', cart);
			if(!cart.hasOwnProperty(id)){
				cart[id] = qty;	
			}else{
				cart[id] = (cart[id] + qty);
			}
			console.log(cart);
		}

	};

});