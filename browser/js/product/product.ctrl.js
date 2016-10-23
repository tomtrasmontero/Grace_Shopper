//Products controller
app.controller('productCtrl', function($scope,productFactory,products){
	$scope.products = products;
	
	$scope.search = function(item){
		return (angular.lowercase(item.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
			angular.lowercase(item.title).indexOf(angular.lowercase($scope.query) || '') !== -1 );
	};



});

//Product Detail controller
app.controller('productDetailCtrl', function($scope, $stateParams,$state,product){
	$scope.id = $stateParams.id;
	$scope.product = product;
	$scope.reviews = product.reviews;
});

//Product Managment controller
app.controller('productMgmtCtrl', function($scope, products){
	$scope.products = products;

	
});