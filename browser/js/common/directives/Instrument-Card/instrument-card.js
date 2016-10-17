app.directive('productCard', function(){
	return {
		restrict: 'E',
		scope:{
			product: '='
		},
		templateUrl: 'js/common/directives/instrument-card/instrument-card.html'		
	}
});