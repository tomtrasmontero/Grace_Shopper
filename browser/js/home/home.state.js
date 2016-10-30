app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function(homeService, $scope) {
        	homeService.getBestSellers()
        	.then(function(bestSellers) {
        		$scope.bestSellers = bestSellers.slice(0,3);
        	})
        }
    });
});
