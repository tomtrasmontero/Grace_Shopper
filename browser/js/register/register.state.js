app.config(function($stateProvider) {
	$stateProvider.state("register", {
		url: "/register",
		templateUrl: "js/register/register.html",
		controller: "registerCtrl"
	})
})