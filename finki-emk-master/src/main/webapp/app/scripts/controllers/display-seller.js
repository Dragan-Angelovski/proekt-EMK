FirstApp.controller('DisplaySellersController', [
		'$scope',
		'crudService',
		'$routeParams',
		'toaster',
		'ngTableParams',
		'$filter',
		function($scope, crudService, $routeParams, toaster, ngTableParams,
				$filter) {
			var service = crudService('sellers');

			$scope.entities = service.query();

		} ]);
