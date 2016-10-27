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

	$scope.addInstrument = function(productQty,productId){
		ZCartFactory.addItem(parseInt(productId),parseInt(productQty));
	};

});

//Product Managment controller
app.controller('productMgmtCtrl', function($scope, products){
	$scope.products = products;

	$scope.views = { 
		'values': [10,25,50]
	};

	$scope.changeView = function(num){
		$scope.itemsPerPage = num;
	}


	$scope.addNewItem = function(newProduct){
		console.log(newProduct);
	}

});