app.factory('registerService', function($http) {
	return {
		sendInfo: function(info) {
			return $http.post('/api/users/', info);
		}
	}
})