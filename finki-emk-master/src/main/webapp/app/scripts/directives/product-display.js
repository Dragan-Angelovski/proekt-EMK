/*
 * Directive for generic combo (select)
 *
 */

FirstApp.directive('productDisplay', [
		'crudService',
		'$location',
		'toaster',
		'$rootScope',
		function(crudService, $location, toaster, $rootScope) {
			return {
				restrict : 'AE',
				scope : {
					entity : '=',
					orderId : '=',
					shoppingCart : '=',
					removeBtn : '=',
					removeFromCart : '&'
				},
				compile : function(tElem, attrs) {

					return function(scope, elem, attrs) {

					};
				},
				controller : function($scope, $element, crudService, $cookies) {
					$scope.qty = 1;
					$scope.max = $scope.entity.quantity;
					var ordersService = crudService('order_items');
					$scope.display = function() {
						$location.path('/product/details/' + $scope.entity.id);
					};

					$scope.addToCart = function() {
						
							
							if(($scope.qty) && !isNaN($scope.qty) && ($scope.qty >= 1 && $scope.qty <= $scope.entity.quantity ))
							{
							ordersService.save({
								product : {
									id : $scope.entity.id
								}
							}, function() {
								toaster.pop('info', 'Add successful', "Added "
										+ $scope.entity.name + " to cart.");
								$rootScope.numCartItems++;
							});
							}
						
						else
							{
							toaster.pop('error', 'Quantity is not a valid number!', "Quantity must be between 1 and "
									+ $scope.entity.quantity);
							}
							
						
						
					}

					$scope.id = {
						id : $scope.orderId
					}
					
					
			
				},
				templateUrl : 'directives/product-display.html'
			};
		} ]);
