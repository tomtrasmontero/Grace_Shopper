app.directive('productSidebar', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/product-sidebar/product-sidebar.html',
		controller: function($scope,$location){
			$scope.search = function(item){
				return (angular.lowercase(item.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
				angular.lowercase(item.title).indexOf(angular.lowercase($scope.query) || '') !== -1);  
			};

			$scope.categories = function(item){
				return angular.lowercase(item.type).indexOf(angular.lowercase($scope.searchFil) || '') !== -1
			};

			$scope.searchCategories = function(productCat){
				$scope.query = '';
				$scope.searchFil = productCat;
			};

			$scope.productType = ['Guitar','Drums','Bass','DJ','Band & Orchestra','Mics & Wireless'];

		    $scope.navClass = function (page) {
    			var currentRoute = $location.path().substring(1) || 'home';
    			return page === currentRoute ? 'active' : '';
			};
		}
	}
});