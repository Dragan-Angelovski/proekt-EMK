FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope', '$upload' ,
		function($scope, UsersService, $routeParams, $rootScope, $upload) {

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
                        // file is uploaded successfully
                        console.log(data);
                      });
                   }
						$scope.user.imgUrl = files[0].name;
                   } else {

                   }


				user.save($scope.user, function(data) {
					
				});
			};
			
			$scope.files = null;
			
			$scope.onFileSelect = function($files){
				
			}
		} ]);
