app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('orderlist', {
			url: '/orderlist',
			templateUrl: '/js/order/order.list.html',
			resolve: {
				orders: function(OrderFactory){
					return OrderFactory.getAll();
				}
			},
			controller: function(OrderFactory, $state, $scope, orders){
				$scope.orders = orders;
				$scope.page = 1;
				$scope.numPerPage = 3;
				$scope.displayOrders = $scope.orders.slice(0,$scope.numPerPage);
				$scope.pageChanged = function(){
					var startPos = ($scope.page-1) * $scope.numPerPage;
					console.log($scope.page);
				}

				console.log ('scope order is ' + $scope.orders);
				console.log ($scope.orders[3]);

				$scope.delete = function(id){
					return OrderFactory.destroy(id);

				}
				console.log (orders);
			},
			
		})
		.state('edit',{
			url: '/order/:id',
			templateUrl:'/js/order/order.detail.html',
			resolve:{
				order: function(OrderFactory, $stateParams){
					return OrderFactory.getOne($stateParams.id);
				}
			},
			controller: function(OrderFactory, $state, $scope, order){
				$scope.order = order;
				console.log (order);
			}
		})

})
