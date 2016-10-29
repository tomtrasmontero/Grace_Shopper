app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('cart', {
		url: '/cart/:id',
		templateUrl: '/js/zcart/cart.html',
		resolve: {

			cart: function(ZCartFactory, AuthService, Session) {

				return AuthService.getLoggedInUser()
					.then(function(result){
						Session.user = result;
						return ZCartFactory.cart;
					})
			
			}
		},
		controller: function($scope, $state, cart, ZCartFactory, AuthService, Session, $rootScope) { // remove session
			$scope.cart = cart;
			$scope.newAddress = {};

			$scope.submitAddress = function(){
				ZCartFactory.submitAddress($scope.newAddress, Session.user.id)
					.then(function(){
						$scope.newAddress.line1 = "";
						$scope.newAddress.line2 = "";
						$scope.newAddress.city = "";
						$scope.newAddress.state = "";
						$scope.newAddress.zip = "";
						$scope.newAddress.country = "";

					})

			}

			$scope.deleteAddress = function(id){
				ZCartFactory.deleteAddress(id);
			}

			$scope.changeQuantity = function(itemid, quantity, orderid, orderitemIndex){
				ZCartFactory.changeOrderItem(itemid, quantity, orderid, orderitemIndex);
			}

			$scope.deleteItem = function(item){
				ZCartFactory.deleteItem(item);
			};

			$scope.isLoggedIn = function () {
			    return AuthService.isAuthenticated();
			};

			$scope.placeOrder = function(){
				ZCartFactory.placeOrder($scope.cart.id, $scope.cart.address.id);
				$state.go('confirmation', {orderid: cart.id});
				ZCartFactory.loadCart();
			}
		}
	})
	.state('confirmation', {
		url:'/confirmation/:orderid',
		templateUrl:'/js/zcart/confirmation.html',
		controller: function($scope, $state, $stateParams){
			$scope.orderid = $stateParams.orderid;
		}
	})
})