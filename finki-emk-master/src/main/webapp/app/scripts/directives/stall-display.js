/*
 * Directive for generic combo (select)
 *
 */

FirstApp.directive('stallDisplay', [
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
     
      },
      templateUrl: 'directives/stall-display.html'
    };
  }]);

