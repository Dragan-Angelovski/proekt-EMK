/*
 * Directive for generic combo (select)
 *
 */

FirstApp.directive('productDisplay', [ 'crudService', '$location', 'toaster',
		function(crudService, $location, toaster) {
			return {
				restrict : 'AE',
				scope : {
					entity : '=',
					orderId: '=',
					shoppingCart : '=',
					removeBtn: '=',
					removeFromCart: '&'
				},
				compile : function(tElem, attrs) {

					return function(scope, elem, attrs) {

					};
				},
				controller : function($scope, $element, crudService, $cookies) {
					var ordersService = crudService('order_items');
					$scope.display = function() {
						$location.path('/product/details/' + $scope.entity.id);
					};

					$scope.addToCart = function() {
						ordersService.save({
							product : {
								id : $scope.entity.id
							}
						}, function() {
							toaster.pop('success', 'Add successful', "Added "+$scope.entity.name +" to cart.");
						});
					}

					$scope.id = {id : $scope.orderId };
				},
				templateUrl : 'directives/product-display.html'
			};
		} ]);
