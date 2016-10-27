app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('cart2', {
		url: '/cart2/:id',
		templateUrl: '/js/zcart/cart2.html',
		resolve: {
			cart: function(ZCartFactory) {
				return ZCartFactory.cart;
			}
		},
		controller: function($scope, $state, cart, ZCartFactory, AuthService) {
			$scope.cart = cart;

			$scope.deleteItem = function(item){
				ZCartFactory.deleteItem(item);
			};

			$scope.isLoggedIn = function () {
			    return AuthService.isAuthenticated();
			};

			$scope.placeOrder = function(){
				ZCartFactory.placeOrder($scope.cart.id);
				$state.go('confirmation', {orderid: cart.id});
				ZCartFactory.loadCart();
			}
		}
	})
	.state('confirmation2', {
		url:'/confirmation2/:orderid',
		//params:['orderid'],
		templateUrl:'/js/zcart/confirmation.html',
		controller: function($scope, $state, $stateParams){
			$scope.orderid = $stateParams.orderid;
		}
	})
})