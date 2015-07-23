FirstApp.controller('userController', [ '$scope', 'crudService',
		'$routeParams',
		function($scope, crudService, $routeParams) {

			var userService = crudService('users');
			$scope.user = {};
			$scope.user = userService.get({
				username : $routeParams.username
			});

		} ]);
