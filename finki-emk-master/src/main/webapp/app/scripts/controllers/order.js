FirstApp.controller('OrderController',
[
	'$scope',
	'Order',
	'$location',
	'toaster',
	'$rootScope',
	function($scope, Order, $location, toaster, $rootScope) {

		$scope.totalPayment = 0;

		function getOrders() {
			$scope.totalPayment = 0;
			$scope.entities = Order.getMyOrders(function(data) {
                for(var i = 0; i < $scope.entities.length; i++) {
                    $scope.totalPayment += $scope.entities[i].product.price;
                }
            });
		}
		getOrders();


		$scope.pay = function() {
			Order.checkPay({}, function() {
				$location.path("/pay_order");
			});
		}

		$scope.remove = function (id, index) {
			console.log("Index:"+index);
			Order.remove(
			{
				id: id
			},
			function () {
				$scope.totalPayment -= $scope.entities[index].product.price;
				$scope.entities.splice(index,1);
				$rootScope.numCartItems -= 1;
				toaster.pop('info', 'Remove successful', "Removed product from cart.");
			},
			function (res) {
				if (res.status == 500) {
					toaster.pop(
						'error',
						'Deleting error',
						"Ne moze da se izbrise objektot. Postoi drug objekt so nadvoresen kluc koj pokazuva kon nego!"
					);
				}
			});
		};
	}
]);
