app.config(function($stateProvider) {
	$stateProvider.state('userProfile', {
		url: '/users/:id',
		templateUrl: 'js/user-profile/user-profile.html',
		controller: 'userProfileCtrl'
	})
});