FirstApp.controller('DetailStallController', [ '$scope', 'crudService',
		'$routeParams', 'ProductService',
		function($scope, crudService, $routeParams, ProductService) {

			var stallId = $routeParams.id;
			var stallService = crudService('stalls');

			
			$scope.stall = stallService.get({
				id : stallId
			});
			$scope.products = ProductService.findByStall({
				id : stallId
			});

			

		} ]);
