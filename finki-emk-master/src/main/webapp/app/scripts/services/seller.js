/*
 * Generic CRUD resource REST service
 */
FirstApp.factory('SellerService', ['$resource', 'settings', function($resource, settings) {

  return $resource('/data/rest/sellers/:id', {}, {
	  findByUserId: {
	      method: 'GET',
	      url: "/data/rest/sellers/by_user/:userId"
	    }
  });

}]);
