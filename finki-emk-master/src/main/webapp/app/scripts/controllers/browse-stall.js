/**
 * Created by riste_000 on 3/18/2015.
 */

FirstApp.controller('BrowseStallController', [
  '$scope',
  'crudService',
  '$routeParams',
  'ProductService',
  function ($scope, crudService, $routeParams, ProductService) {
    var stallService = crudService('stalls');
    $scope.stall = stallService.get({
      id: $routeParams.id
    });

    $scope.entities = ProductService.findByStall({
      id: $routeParams.id
    });


  }]);
