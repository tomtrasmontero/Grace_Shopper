app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('orderlist', {
			url: '/orderlist',
			templateUrl: '/js/order/order.list.html',
			resolve: {
				orders: function(OrderFactory){
					return OrderFactory.getAll();
				}
			},
			controller: function(OrderFactory, $state, $scope, orders){
				$scope.orders = orders;
				$scope.total = 0;
				$scope.page = 1;
				$scope.numPerPage = 3;
				$scope.displayOrders = $scope.orders.slice(0,$scope.numPerPage);
				$scope.pageChanged = function(){
					var startPos = ($scope.page-1) * $scope.numPerPage;
					console.log($scope.page);
				}

				// $scope.addToTotal = function(n){
				// 	$scope.total = $scope.total + n;
				// }

				$scope.displayTotal = function(order){
					var total = 0;
					for (let i = 0; i< order.orderitems.length; i++){
						total = total + (order.orderitems[i].instrument.price * order.orderitems[i].quantity);
					}
					return total;
				}

				console.log ('scope order is ' + $scope.orders);
				console.log ($scope.orders[3]);

				$scope.delete = function(id){
					return OrderFactory.destroy(id);

				}
				console.log (orders);
			},
			
		})
		.state('edit',{
			url: '/order/:id',
			templateUrl:'/js/order/order.detail.html',
			resolve:{
				order: function(OrderFactory, $stateParams){
					return OrderFactory.getOne($stateParams.id);
				}
			},
			controller: function(OrderFactory, $state, $scope, order, $stateParams, Session, $rootScope){
				//OrderFactory.getOne($stateParams.id);
				$scope.order = order;
				console.log("the id is " + Session.user.id);
				console.log (OrderFactory.theorder);
				//console.log ("k" + $scope.order[id]);
				console.log ($stateParams.id);
				console.log (order);
				console.log (OrderFactory.theorder);
				$scope.total = 0;


				for (var i =0; i<$scope.order.orderitems.length; i++){
					$scope.total = $scope.total + ($scope.order.orderitems[i].instrument.price * $scope.order.orderitems[i].quantity);
				}

				$scope.displayTotal = function(order){
					var total = 0;
					for (let i = 0; i< order.orderitems.length; i++){
						total = total + (order.orderitems[i].instrument.price * order.orderitems[i].quantity);
					}
					return total;
				}

				// $scope.showTotal = function(){
				// 	// var total = 0;
				// 	// for (let i = 0; i< $scope.order.orderitems.length; i++){
				// 	// 	total = total + ($scope.order.orderitems[i].instrument.price * $scope.order.orderitems[i].quantity);
				// 	// }
				// 	return 1;
				// }

				// $scope.test = function(){
				// 	return "aaa"
				// }

				$scope.doesBelongTo = function(){
					var oneOfThree = OrderFactory.oneOfThree($scope.order.status);
					return oneOfThree;
				}

				$scope.changeQuantity = function(itemid, quantity, orderid){
					OrderFactory.changeOrderItem(itemid, quantity, orderid);


				}

				$scope.deleteItem = function(itemid, index, orderid){
					OrderFactory.deleteItem(itemid);
					console.log("order id is " + orderid);
					console.log ("index is " + index);
				}

				$scope.submit = function(){
					OrderFactory.updateOrder($scope.order);
				}


				// $scope.deleteOrder = function(id){
				// 	OrderFactory.destroy(id);
				// 	$state.go('orderList');
				// }
			}
		})

		// .state('cart',{
		// 	url:'/cart/:id',
		// 	templateUrl:'/js/order/myCart.html',
		// 	resolve:{
		// 		order: function(OrderFactory, $stateParams){
		// 			return OrderFactory.getCart(1); //change this hard coding s
		// 		}
		// 	},
		// 	controller: function(OrderFactory, $state, $scope, Session, order){
		// 		console.log (Session);
		// 		$scope.order = order;
		// 		console.log (order);

		// 		$scope.submit = function(){
		// 			OrderFactory.updateOrder($scope.order);
		// 		}

		// 		$scope.changeQuantity = function(itemid, quantity, orderid){
		// 			OrderFactory.changeOrderItem(itemid, quantity, orderid);

		// 		}

		// 		$scope.deleteItem = function(itemid, index, orderid){
		// 			OrderFactory.deleteItem(itemid);
		// 			console.log("order id is " + orderid);
		// 			console.log ("index is " + index);
		// 		}

		// 		$scope.placeOrder = function(){
		// 			OrderFactory.placeOrder($scope.order.id);
		// 			$state.go('confirmation', {orderid: order.id});
		// 		}

		// 	}
		// })

		// .state('confirmation', {
		// 	url:'/confirmation/:orderid',
		// 	//params:['orderid'],
		// 	templateUrl:'/js/order/confirmation.html',
		// 	controller: function($scope, $state, $stateParams){
		// 		console.log ("state param is " + $stateParams.orderid);
		// 		$scope.orderid = $stateParams.orderid;
		// 	}
		// })

})
