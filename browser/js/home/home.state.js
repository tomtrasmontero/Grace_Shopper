app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function(homeService, userFactory, $scope, Session) {
        	if (Session.user) {
                userFactory.getById(Session.user.id)
                .then(function(user) {
                    $scope.user = user;
                });
            }

            homeService.getBestSellers()
        	.then(function(bestSellers) {
        		$scope.bestSellers = bestSellers.slice(0,3);
        	});
        }
    });
});
