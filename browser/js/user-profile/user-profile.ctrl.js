app.controller('userProfileCtrl', function($scope, userFactory, $stateParams, $state, AuthService) {
	userFactory.getById($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	$scope.deleteUser = function(id) {
		userFactory.deleteUser(id)
		.then(function() {
			$state.go('home');
		});
	};

	$scope.editUser = function(user) {
		userFactory.editUser(user)
		.then(function(user) {
			$state.go('/user/' + user.id);
		});
	};

});