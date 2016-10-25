app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('cart',{
			url:'/cart/:id',
			templateUrl:'/js/zcart/myCart.html',
			resolve:{
				order: function(ZCartFactory, $stateParams, Session){
					console.log (Session.user.id);
					return ZCartFactory.getCart(Session.user.id); //change this hard coding s // Session.user.id
				}
			},
			controller: function(ZCartFactory, OrderFactory, $state, $scope, Session, order){
				console.log (Session);
				$scope.order = order;
				console.log ("the order is !" + order);
				console.log (order);
				console.log ($scope.order.orderitems.length);

				$scope.submit = function(){
					ZCartFactory.updateOrder($scope.order);
				}

				$scope.changeQuantity = function(itemid, quantity, orderid){
					ZCartFactory.changeOrderItem(itemid, quantity, orderid);

				}

				$scope.deleteItem = function(itemid, index, orderid){
					ZCartFactory.deleteItem(itemid);
					console.log("order id is " + orderid);
					console.log ("index is " + index);
				}

				$scope.placeOrder = function(){
					ZCartFactory.placeOrder($scope.order.id);
					$state.go('confirmation', {orderid: order.id});
				}

			}
		})

		.state('confirmation', {
			url:'/confirmation/:orderid',
			//params:['orderid'],
			templateUrl:'/js/zcart/confirmation.html',
			controller: function($scope, $state, $stateParams){
				console.log ("state param is " + $stateParams.orderid);
				$scope.orderid = $stateParams.orderid;
			}
		})

})
