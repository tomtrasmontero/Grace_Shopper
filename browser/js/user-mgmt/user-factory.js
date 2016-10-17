app.factory('userFactory', function($http) {
	return {
		getAll: function() {
			return $http.get('/api/users')
			.then(function(results) {
				return results.data;
			});
		},

		getById: function(id) {
			return $http.get('/api/users/' + id)
			.then(function(result) {
				return result.data;
			});
		},

		deleteUser: function(id) {
			return $http.delete('/api/users/' + id);
		}
	}
})