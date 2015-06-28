FirstApp.controller('DisplayStallsController',
[
	'$scope', 'crudService',
	function($scope, crudService) {
		var StallService = crudService('stalls');

        function compare(a,b) {
			if (a.number < b.number)
			return -1;
			if (a.number > b.number)
			return 1;
			return 0;
		}

		StallService.query(function(data) {
			$scope.entities = data;
			$scope.entities.sort(compare);
		});
	}
]);
