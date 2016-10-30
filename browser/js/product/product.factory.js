app.factory('productFactory', function($http){
	var products = [];
	
	return {
		editImg: function(img,idx){
			img.splice(idx,1);
		},

		getAll: function(){
			return $http.get('/api/product')
			.then(function(result){
				angular.copy(result.data, products);
				return products;
			});
		},

		getProduct: function(id){
			return $http.get('/api/product/' + id)
			.then(function(product){
				return product.data;
			});
		},

		addProduct: function(product){
			return $http.post('/api/product/add', product)
			.then(function(result){
				angular.copy(result.data, products);
				return products;
			});
		},
		editProduct: function(product){
			return $http.put('/api/product/edit', product);		
		}

	};
});