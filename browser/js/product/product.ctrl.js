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

	//image carousel
	$scope.myInterval = 4000;

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
			$scope.newItem.name = '';
			$scope.newItem.brand = '';
			$scope.newItem.family = '';
			$scope.newItem.type = '';
			$scope.newItem.price = '';
			$scope.newItem.quantity = '';
			$scope.newItem.image = '';
			$scope.newItem.description = '';
			$scope.products = result;
		});
	};

	$scope.editProduct = function(product){
		$state.go('productMgmtEdit', {myProduct: product});
	};


});

//Products Edit controller
app.controller('productEditCtrl', function($scope,$state, productFactory){
	if(!$state.params.myProduct){
		$state.go('productMgmt');
	}

	$scope.product = $state.params.myProduct;
	$scope.deleteButton = false;

	$scope.edit = function(product){
		// update the image on the front end
		if(product.newImgUrl){
			$scope.product.image.push(product.newImgUrl);
			//send the new image to the server
			product.image = $scope.product.image;	
		}

		productFactory.editProduct(product)
		.then(function(){
			$scope.product.newImgUrl = "";
		});
	};

	$scope.deleteImg = function(idx){
		productFactory.editImg($scope.product.image,idx)
	};

	$scope.deleteProduct = function(id){
		productFactory.deleteProduct(id)
		.then( function(){
			$state.go('productMgmt');
		})
	};
	
});