app.config(function($stateProvider) {
	$stateProvider.state('userMgmt', {
		url: '/userMgmt',
		templateUrl: 'js/user-mgmt/user-mgmt.html',
		controller: 'userMgmtCtrl'
	})
});
