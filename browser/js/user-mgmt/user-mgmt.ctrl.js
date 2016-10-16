app.controller('userMgmtCtrl', function($scope, userFactory) {
	return userFactory.getAll()
	.then(function(users) {
		$scope.users = users;
	});
});