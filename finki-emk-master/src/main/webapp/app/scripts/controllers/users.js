FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope',
		function($scope, UsersService, $routeParams, $rootScope) {


			$scope.user = {};

			//POST
			$scope.user = UsersService.username($.param ({
				username : $rootScope.user.username
			}));

			//GET
			/*$scope.user = UsersService.get({
				username : $routeParams.username
			});
			*/
		} ]);
