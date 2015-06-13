/*
 * Generic CRUD resource REST service
 */
FirstApp.factory('ProductService', ['$resource', 'settings', function($resource, settings) {

  return $resource('/data/rest/products/:id', {}, {
    findByCategory: {
      method: 'GET',
      url: "/data/rest/products/by_category/:id",
      isArray: true
    },
    
    findByType: {
        method: 'GET',
        url: "/data/rest/products/by_type/:id",
        isArray: true
      },
      
      findBySeller: {
          method: 'GET',
          url: "/data/rest/products/by_seller/:id",
          isArray: true
        },
      
      findByStall: {
          method: 'GET',
          url: "/data/rest/products/by_stall/:id",
          isArray: true
        },
    search: {
      method: 'GET',
      url: '/data/rest/products/search',
      isArray: true
    },
    paged: {
      method: 'GET',
      url: "/data/rest/products/paged"
    }
  });

}]);
