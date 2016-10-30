//Products controller
app.controller('productCtrl', function($scope,productFactory,products){
	$scope.products = products;
	

});

//Product Detail controller
app.controller('productDetailCtrl', function($scope, $stateParams,$state,product,ZCartFactory){
	$scope.id = $stateParams.id;
	$scope.product = product;
	$scope.reviews = product.reviews;
	$scope.product.quantity = 1;

	$scope.addInstrument = function(product){
		ZCartFactory.addItem({instrument: product, quantity: product.quantity});
	};

});

//Product Managment controller
app.controller('productMgmtCtrl', function($scope, products,productFactory,$state){
	$scope.products = products;

	$scope.views = { 
		'values': [10,25,50]
	};

	$scope.changeView = function(num){
		$scope.itemsPerPage = num;
	};

	$scope.addNewItem = function(newProduct){
		productFactory.addProduct(newProduct)
		.then(function(result){
			$scope.products = result;
		});
	};

	$scope.editProduct = function(product){
		console.log(product, 'in mgmt ctrl');
		$state.go('productMgmtEdit', {myProduct: product});
	};

});

//Products Edit controller
app.controller('productEditCtrl', function($scope,$state){
	$scope.product = $state.params.myProduct;

	$scope.edit = function(test){
		console.log(test,'im in edit');
	}
	
});