app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function(userFactory, $scope, Session, bestSellers) {
        	if (Session.user) {
                userFactory.getById(Session.user.id)
                .then(function(user) {
                    $scope.user = user;
                });
            }
        	$scope.bestSellers = bestSellers;
        },
        resolve: {
            bestSellers: function(homeService) {
                return homeService.getBestSellers()
                    .then(function(bestSellers) {
                    return bestSellers.slice(0,4);
                });
            }
        }
    });
});
