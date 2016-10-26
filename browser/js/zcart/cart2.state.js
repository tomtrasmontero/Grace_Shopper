app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('cart2', {
		url: '/cart2/:id',
		templateUrl: '/js/zcart/cart2.html',
		resolve: {
			cart: function(ZCartFactory) {
				return ZCartFactory.cart;
			}
		},
		controller: function($scope, cart, ZCartFactory, AuthService) {
			$scope.cart = cart;

			$scope.deleteItem = function(item){
				ZCartFactory.deleteItem(item);
			};

			$scope.isLoggedIn = function () {
			    return AuthService.isAuthenticated();
			};
		}
	})
})