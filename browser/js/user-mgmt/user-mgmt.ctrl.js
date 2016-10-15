app.controller('userMgmtCtrl', function($scope, userMgmtFactory) {
	return userMgmtFactory.getAll()
	.then(function(users) {
		$scope.users = users;
	});
});