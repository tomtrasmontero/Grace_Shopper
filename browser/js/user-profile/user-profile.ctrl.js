app.controller('userProfileCtrl', function($scope, userFactory, $stateParams) {
	return userFactory.getById($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});
});