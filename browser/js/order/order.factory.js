app.factory('OrderFactory',function($http, $state){

	var OrderFactory = {};
	var orders = [];
	var theorder = {};

	OrderFactory.getAll = function(){
		return $http.get('/api/order')
			.then(function(results){
				angular.copy(results.data, orders);
				console.log ('orders are ' + orders);
				console.log(orders[1]);
				return orders;
			})
	}

	OrderFactory.destroy = function(id){
		return $http.delete('/api/order/' + id)
			.then(function(result){
				var idx = orders.findIndex(function(element){
					return element.id === id;
				})
				orders.splice(idx, 1);
				return orders;
			})
	}

	OrderFactory.getOne = function(id){
		return $http.get('/api/order/' + id)
			.then(function(result){
				theorder = angular.copy(result.data);
				return theorder;
			})
	}


	// QuestionFactory.save = function(newQuestion){
	// 	return $http.post('/api/questions/' + newQuestion.content + '/' + newQuestion.respondent, newQuestion)
	// 		.then(function(result){
	// 			questions.push(result.data);
	// 			return questions;
	// 		})

	// }

	// QuestionFactory.findAllFrom = function(someone){
	// 	console.log ('someone is ' + someone);
	// 	return $http.get('/api/questions/'+ someone)
	// 		.then(function(results){
	// 			angular.copy(results.data, testQuestions);
	// 			console.log('testquestion is ' + testQuestions);
	// 			console.log (testQuestions);
	// 			return testQuestions;
	// 		})
	// }

	return OrderFactory;

})