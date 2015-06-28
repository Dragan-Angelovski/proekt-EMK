FirstApp.controller('DisplaySellersController',
[
	'$scope',
	'crudService',
	'$routeParams',
	'toaster',
	'ngTableParams',
	'$filter',
	function($scope, crudService, $routeParams, toaster, ngTableParams,$filter) {
		var service = crudService('sellers');

		service.query(function(data) {
			$scope.entities = data;
		});
	}
]);
