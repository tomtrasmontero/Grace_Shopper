app.factory('userMgmtFactory', function($http) {
	return {
		getAll: function() {
			return $http.get('/api/users')
			.then(function(results) {
				return results.data;
			});
		}
	}
})