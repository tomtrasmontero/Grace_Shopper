// app.config(function($stateProvider, $urlRouterProvider){
// 	$stateProvider
// 		.state('cart',{
// 			url:'/cart/:id',
// 			templateUrl:'/js/order/myCart.html',
// 			resolve:{
// 				order: function(OrderFactory, $stateParams){
// 					return OrderFactory.getCart(1); //change this hard coding s
// 				}
// 			},
// 			controller: function(OrderFactory, $state, $scope, Session, order){
// 				console.log (Session);
// 				$scope.order = order;
// 				console.log (order);

// 				$scope.submit = function(){
// 					OrderFactory.updateOrder($scope.order);
// 				}

// 				$scope.changeQuantity = function(itemid, quantity, orderid){
// 					OrderFactory.changeOrderItem(itemid, quantity, orderid);

// 				}

// 				$scope.deleteItem = function(itemid, index, orderid){
// 					OrderFactory.deleteItem(itemid);
// 					console.log("order id is " + orderid);
// 					console.log ("index is " + index);
// 				}

// 				$scope.placeOrder = function(){
// 					OrderFactory.placeOrder($scope.order.id);
// 					$state.go('confirmation', {orderid: order.id});
// 				}

// 			}
// 		})

// 		.state('confirmation', {
// 			url:'/confirmation/:orderid',
// 			//params:['orderid'],
// 			templateUrl:'/js/order/confirmation.html',
// 			controller: function($scope, $state, $stateParams){
// 				console.log ("state param is " + $stateParams.orderid);
// 				$scope.orderid = $stateParams.orderid;
// 			}
// 		})

// })
