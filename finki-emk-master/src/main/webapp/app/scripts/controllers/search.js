/**
 * Created by riste_000 on 4/8/2015.
 */

FirstApp.controller('SearchController', [
  '$scope',
  '$routeParams',
  '$location',
  'BookService',
  function ($scope, $routeParams, $location, BookService) {
    $scope.search = function () {
      $location.path("/search").search({
        text: $scope.searchField
      });
    };

    if ($routeParams.text) {
      $scope.entities = BookService.search({
        text: $routeParams.text
      });
    }
  }]);
