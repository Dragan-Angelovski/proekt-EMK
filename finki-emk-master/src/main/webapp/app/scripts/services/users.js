
FirstApp.factory('UsersService', function($resource) {

	return $resource('/data/rest/users/:action', {}, {
		username:{
			method: 'POST',
			params : {
				'action' : 'username'
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}
	});
});