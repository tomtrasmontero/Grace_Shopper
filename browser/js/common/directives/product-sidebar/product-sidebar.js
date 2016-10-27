app.directive('productSidebar', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/product-sidebar/product-sidebar.html',
		controller: function($scope){
			$scope.search = function(item){
				return (angular.lowercase(item.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
				angular.lowercase(item.title).indexOf(angular.lowercase($scope.query) || '') !== -1 );
			};
		}
	}
});