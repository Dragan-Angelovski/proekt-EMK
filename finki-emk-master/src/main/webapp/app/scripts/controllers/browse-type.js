/**
 * Created by riste_000 on 3/18/2015.
 */

FirstApp.controller('BrowseTypeController', [
  '$scope',
  'crudService',
  '$routeParams',
  'ProductService',
  function ($scope, crudService, $routeParams, ProductService) {
    var typeService = crudService('types');
    $scope.type = typeService.get({
      id: $routeParams.id
    });

    $scope.entities = ProductService.findByType({
      id: $routeParams.id
    });


  }]);
