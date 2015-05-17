/*
 * Directive for generic combo (select)
 *
 */

FirstApp.directive('productDisplay', [ 'crudService', '$location',
		function(crudService, $location) {
			return {
				restrict : 'AE',
				scope : {
					entity : '=',
					shoppingCart : '='
				},
				compile : function(tElem, attrs) {

					return function(scope, elem, attrs) {

					};
				},
				controller : function($scope, $element, crudService, $cookies) {
					var ordersService = crudService('order_items');
					$scope.display = function() {
						$location.path('/book/details/' + $scope.entity.id);
					};

					$scope.addToCart = function() {
						ordersService.save({
							book : {
								id : $scope.entity.id
							}
						});
					}
				},
				templateUrl : 'directives/product-display.html'
			};
		} ]);
