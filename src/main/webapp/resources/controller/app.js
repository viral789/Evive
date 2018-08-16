(function () {

var app = angular.module('app',['ui.router', 'ui.bootstrap.tpls', 'ui.bootstrap', 'Controller', 'Service']);

app.config(['$stateProvider', function ($stateProvider) {
	
	$stateProvider
		.state('cast', {
			url: '/',
		    templateUrl: 'resources/view/cast.html',
		    controller: 'castController'
		});
}]);

}());