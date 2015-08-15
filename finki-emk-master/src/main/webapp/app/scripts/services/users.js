
FirstApp.factory('UsersService', function($resource) {
	//POST
	return $resource('/data/rest/users/:action', {}, {
		username:{
			method: 'POST',
			params : {
				'action' : 'username'
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		},
		save:{
			method: 'POST',
			params :{
				'action' : 'save'
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
			
		},
		create:{
			method: 'POST',
			params :{
				'action' : 'create'
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
			
		}
	});
	//GET
	/*return $resource('/data/rest/users/:username', {}, {});*/
});