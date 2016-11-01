app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('cart', {
		url: '/cart/:id',
		templateUrl: '/js/zcart/cart.html',
		resolve: {

			cart: function(ZCartFactory, AuthService, Session, $timeout) {
				return AuthService.getLoggedInUser()
					.then(function(result){
						Session.user = result;
						return ZCartFactory.cart;
					});
			}
		},
		controller: function($scope, $state, cart, ZCartFactory, AuthService, Session, $rootScope) {
			$scope.cart = cart;
			$scope.newAddress = {};
			$scope.canPlaceOrder = true;
			$scope.total = function(){
				return ZCartFactory.getTotal($scope.cart.orderitems);
			}

			$scope.show = Array($scope.cart.orderitems.length).fill(false);

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
				console.log("address length is ");
				console.log ($scope.cart.user);
			}

			$scope.editQuantity = function(index){
				$scope.show[index] = true;
				$scope.canPlaceOrder = false;
			}

			$scope.changeQuantity = function(itemid, quantity, orderid, orderitemIndex){
				ZCartFactory.changeOrderItem(itemid, quantity, orderid, orderitemIndex);
				$scope.show[orderitemIndex] = false;
				$scope.canPlaceOrder = true;
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

				emailjs.send('default_service','confirmation',{
				  email: cart.user.email, 
				  number: cart.id, 
				});
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