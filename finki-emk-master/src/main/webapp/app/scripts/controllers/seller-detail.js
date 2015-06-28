FirstApp.controller('DetailSellerController',
[
	'$scope',
	'crudService',
	'$routeParams',
	'StallService',
	function($scope, crudService, $routeParams, StallService) {
			var sellerId = $routeParams.id;
			var sellerService = crudService('sellers');

			function compare(a,b) {
				if (a.number < b.number)
				return -1;
				if (a.number > b.number)
				return 1;
				return 0;
            }

			StallService.findBySeller({
				id : sellerId
			}, function(data) {
				$scope.stalls = data;
				$scope.stalls.sort(compare);
			});

			$scope.seller = {};
			$scope.seller = sellerService.get({
				id : sellerId
			});
	}
]);
