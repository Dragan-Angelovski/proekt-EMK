/*
 * Generic CRUD resource REST service
 */
FirstApp.factory('StallService', ['$resource', function($resource) {

  return $resource('/data/rest/stalls/:id', {}, {
    findBySeller: {
      method: 'GET',
      url: "/data/rest/stalls/by_seller/:id",
      isArray: true
    }
  });

}]);
