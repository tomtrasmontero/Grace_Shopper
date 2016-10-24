app.factory('productFactory', function($http){
	var products = []

	return {
		getAll: function(){
			return $http.get('/api/product')
			.then(function(result){
				angular.copy(result.data, products);
				return result.data;
			});
		},

		getProduct: function(id){
			return $http.get('/api/product/' + id)
			.then(function(product){
				return product.data;
			});
		}	

	};
});