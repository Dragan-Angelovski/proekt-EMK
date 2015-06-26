FirstApp.controller('OrderController',
  [
    '$scope',
    'Order',
    '$location',
    function($scope, Order, $location) {

      $scope.totalPayment = 0;

      $scope.entities = Order.getMyOrders(function(data) {
        for(var i = 0; i < $scope.entities.length; i++) {
          $scope.totalPayment += $scope.entities[i].product.price;
        }
      });

      $scope.pay = function() {
        Order.checkPay({}, function() {
          $location.path("/pay_order");
        });
      }


    }]);
