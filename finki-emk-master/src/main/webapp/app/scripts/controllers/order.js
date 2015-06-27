FirstApp.controller('OrderController',
[
	'$scope',
	'Order',
	'$location',
	'toaster',
	function($scope, Order, $location, toaster) {

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

		$scope.remove = function (id) {
			console.log("Remove: "+id);
			Order.remove(
			{
				id: id
			},
			function () {
				getOrders();
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
