FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams',
		function($scope, UsersService, $routeParams) {

			$scope.user = {};
			$scope.user = UsersService.username($.param ({
				username : username.value
			}));
			console.log(username.value);
		} ]);
