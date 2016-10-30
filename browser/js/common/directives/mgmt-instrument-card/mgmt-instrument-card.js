app.directive('productEdit', function(){
	return {
		restrict: 'E',
		controller: 'productEditCtrl',
		scope:{
			product: '='
		},
		templateUrl: 'js/common/directives/mgmt-instrument-card/mgmt-instrument-card.html'		
	}
});