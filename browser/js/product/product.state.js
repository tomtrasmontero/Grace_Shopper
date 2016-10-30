app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('product', {
		url: '/product',
		templateUrl: 'js/product/product.html',
		controller: 'productCtrl',
		resolve: {
			products: function(productFactory){
				return productFactory.getAll()
			}
		}
	})
	.state('productDetail', {
		url: '/product/:id',
		templateUrl: 'js/product/product.detail.html',
		controller: 'productDetailCtrl',
		resolve: {
			product: function(productFactory,$stateParams){
				return productFactory.getProduct($stateParams.id)
			}
		}
	})
	.state('productMgmt', {
		url: '/productMgmt',
		templateUrl: 'js/product/product-management.html',
		controller: 'productMgmtCtrl',
		resolve: {
			products: function(productFactory){
				return productFactory.getAll()
			}
		}
	})
	.state('productMgmtEdit', {
		url: '/productMgmt',
		params:{
			myProduct: null
		},
		templateUrl: 'js/product/product-edit.html',
		controller: 'productEditCtrl'

	})

	$urlRouterProvider.otherwise('/');

});