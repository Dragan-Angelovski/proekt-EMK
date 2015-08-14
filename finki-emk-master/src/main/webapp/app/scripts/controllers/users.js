FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope', '$upload' , 'crudService',
		function($scope, UsersService, $routeParams, $rootScope, $upload, crudService) {

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
			
			$scope.save = function($files) {
				
				$scope.files = $files;
				
				if($scope.files != null) {
					var files = $scope.files;
					$scope.files = null;



				 for (var i = 0; i < files.length; i++) {
                      var file = files[i];
                      $scope.upload = $upload.upload({
                        url: 'http://localhost:9955/green-market/upload_user', //upload.php script, node.js route, or servlet url
                        file: file,
                      }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                      }).success(function(data, status, headers, config) {
                        
                    	  $scope.user.imgUrl = files[0].name;
  						

 						 UsersService.save($.param ({
 							user : $scope.user
 						 }));
                        
                      });
                   }
						
                   } else {

                   }

					
			};
			
			$scope.files = null;
			
		} ]);
