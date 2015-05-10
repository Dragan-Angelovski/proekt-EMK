/**
 * Created by riste_000 on 3/18/2015.
 */

FirstApp.controller('BrowseCategoryController', [
  '$scope',
  'crudService',
  '$routeParams',
  'ProductService',
  function ($scope, crudService, $routeParams, ProductService) {
    var categoryService = crudService('categories');
    $scope.cat = categoryService.get({
      id: $routeParams.id
    });

    $scope.entities = ProductService.findByCategory({
      id: $routeParams.id
    });
   
  }]);
