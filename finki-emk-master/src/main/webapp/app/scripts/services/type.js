/*
 * Generic CRUD resource REST service
 */
FirstApp.factory('TypeService', ['$resource', 'settings', function($resource, settings) {

  return $resource('/data/rest/types/:id', {}, {
    findByCategory: {
      method: 'GET',
      url: "/data/rest/types/by_category/:id",
      isArray: true
    }
  });

}]);
