app.factory('homeService', function($http) {
	return {
		getBestSellers: function() {
			return $http.get('/api/product/bestsellers')
			.then(function(results) {
				console.log(results);
				return results.data;
			});
		}
	}
});