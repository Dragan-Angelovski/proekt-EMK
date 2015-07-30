FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams',
		function($scope, UsersService, $routeParams) {

			$scope.user = {};
			
			//POST
			/*$scope.user = UsersService.username($.param ({
				username : username.value
			}));*/
			
			//GET
			$scope.user = UsersService.get({
				username : $routeParams.username
			});
			
		} ]);
