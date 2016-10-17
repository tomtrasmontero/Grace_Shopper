app.controller('userProfileCtrl', function($scope, userFactory, $stateParams, $state) {
	userFactory.getById($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	$scope.deleteUser = function(id) {
		userFactory.deleteUser(id)
		.then(function() {
			$state.go('userMgmt');
		});
	};

});