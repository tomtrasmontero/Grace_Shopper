//Product controller
app.controller('productCtrl', function($scope,productFactory,products){
	$scope.products = products;
});

//Product Detail controller
app.controller('productDetailCtrl', function($scope, $stateParams,$state,product){
	$scope.id = $stateParams.id;
	$scope.product = product;
	$scope.reviews = product.reviews;
});

//Product Managment controller
app.controller('productMgmtCtrl', function($scope){

});