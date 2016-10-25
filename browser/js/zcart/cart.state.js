app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('cart',{
			url:'/cart/:id',
			templateUrl:'/js/zcart/myCart.html',
			resolve:{
				order: function(ZCartFactory, $stateParams, Session){
					//console.log (Session.user.id);
					console.log ("Session is " + Session);
					if (Session.user){
						return ZCartFactory.getCart(Session.user.id); //change this hard coding s // Session.user.id
					}
					else{
						console.log ("comon cart!" + ZCartFactory.guestCart());
						console.log (ZCartFactory.guestCart());
						return ZCartFactory.guestCart();
					}
				}
			},
			controller: function(ZCartFactory, OrderFactory, $state, $scope, Session, order){ 

				console.log("Session is ");
				console.log (Session.user);

				// if (Session){
				// 	ZCartFactory.getCart(Session.user.id)
				// 		.then(function (result){
				// 			$scope.order = ZCartFactory.cart;
				// 		})
				// }

				//$scope.order = ZCartFactory.cart;


				//console.log (Session);
				$scope.order = order;
				console.log("the cart is "+ order);
				console.log("the scope order is ");
				console.log($scope.order);
				//console.log (ZCartFactory.cart);
				//console.log ("the order is !" + order);
				//console.log (order);
				//console.log ("this length is " + $scope.order.orderitems.length);

				$scope.submit = function(){
					ZCartFactory.updateOrder($scope.order);
				}

				$scope.changeQuantity = function(itemid, quantity, orderid, orderitemIndex){
					ZCartFactory.changeOrderItem(itemid, quantity, orderid, orderitemIndex);

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
