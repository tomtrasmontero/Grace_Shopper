app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product',
		templateUrl: 'js/product/product.html',
		controller: 'productCtrl',
		resolve: {
			products: function(productFactory){
				return productFactory.getAll()
			}
		}
	})
});