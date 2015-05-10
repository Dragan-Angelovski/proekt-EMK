/*
 * Generic CRUD resource REST service
 */
FirstApp.factory('TypeService', [ '$resource', function($resource) {
	return $resource('/data/rest/types/:id', {}, {});
} ]);
