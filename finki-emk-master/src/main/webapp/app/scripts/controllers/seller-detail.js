FirstApp.controller('DetailSellerController', [ '$scope', 'crudService',
		'$routeParams', 'StallService',
		function($scope, crudService, $routeParams, StallService) {

			var sellerId = $routeParams.id;
			var sellerService = crudService('sellers');

			$scope.stalls = StallService.findBySeller({
				id : sellerId
			});

			$scope.seller = {};
			$scope.seller = sellerService.get({
				id : sellerId
			});

		} ]);
