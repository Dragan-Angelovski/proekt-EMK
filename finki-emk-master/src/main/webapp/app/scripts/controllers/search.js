/**
 * Created by riste_000 on 4/8/2015.
 */

FirstApp.controller('SearchController', [
  '$scope',
  '$routeParams',
  '$location',
  'ProductService',
  function ($scope, $routeParams, $location, ProductService) {
    $scope.search = function () {
      $location.path("/search").search({
        text: $scope.searchField
      });
    };

    if ($routeParams.text) {
      $scope.entities = ProductService.search({
        text: $routeParams.text
      });
    }
  }]);
