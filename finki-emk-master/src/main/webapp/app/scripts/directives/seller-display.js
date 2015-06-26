/*
 * Directive for generic combo (select)
 *
 */

FirstApp.directive('sellerDisplay', [
  'crudService',
  '$location',
  function (crudService, $location) {
    return {
      restrict: 'AE',
      scope: {
        entity: '=',
      },
      compile: function (tElem, attrs) {

        return function (scope, elem, attrs) {

        };
      },
      controller: function ($scope, $element, crudService, $cookies) {
        $scope.display = function () {
                  $location.path('/sellers/' + $scope.entity.id);
        };
      },
      templateUrl: 'directives/seller-display.html'
    };
  }]);

