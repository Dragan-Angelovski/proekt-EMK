FirstApp.controller('ProductDetailsController', [ '$scope', 'crudService',
		'$routeParams', 'toaster', '$rootScope' ,
		function($scope, crudService, $routeParams, toaster, $rootScope) {

			var productId = $routeParams.id;
			var productService = crudService('products');
			
			var ordersService = crudService('order_items');

			/*$scope.stalls = StallService.findBySeller({
				id : sellerId
			});*/

			$scope.product = {};
			$scope.product = productService.get({
				id : productId
			});
			
			$scope.qty = 1;
			$scope.max = $scope.product.quantity;
			
			$scope.addToCart = function() {
				
				
				if(($scope.qty) && !isNaN($scope.qty) && ($scope.qty >= 1 && $scope.qty <= $scope.product.quantity ))
				{
				ordersService.save({
					product : {
						id : $scope.product.id
					}
				}, function() {
					toaster.pop('info', 'Add successful', "Added "
							+ $scope.product.name + " to cart.");
					$rootScope.numCartItems++;
				});
				}
			
			else
				{
				toaster.pop('error', 'Quantity is not a valid number!', "Quantity must be between 1 and "
						+ $scope.product.quantity);
				}
				
			
			
		}

		} ]);
