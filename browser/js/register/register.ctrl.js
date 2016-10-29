app.controller('registerCtrl', function($scope, AuthService, $state, registerService) {
	$scope.info = {};

	$scope.sendInfo = function(info) {
		registerService.sendInfo(info)
		.then(function() {
			$state.go('login');
		});
	}

})