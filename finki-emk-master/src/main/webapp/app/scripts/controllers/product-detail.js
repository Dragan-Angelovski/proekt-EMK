FirstApp.controller('ProductDetailsController', [ '$scope', 'crudService',
		'$routeParams',
		function($scope, crudService, $routeParams) {

			var productId = $routeParams.id;
			var productService = crudService('products');

			/*$scope.stalls = StallService.findBySeller({
				id : sellerId
			});*/

			$scope.product = {};
			$scope.product = productService.get({
				id : productId
			});

		} ]);
