FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope', '$upload' , 'crudService',
		function($scope, UsersService, $routeParams, $rootScope, $upload, crudService) {

			var stallService = crudService('stalls');
			var sellerService = crudService('sellers');
			
			//POST
			
			UsersService.username($.param ({
				username : $rootScope.user.username
				
			}),function(data){
				$scope.user = data;
			});
			
			$scope.user = {
				firstName : $scope.name
			}
			
			console.log($scope.editUser);
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
                    	  

 						 
                      });
                      
                     
                   }
				 	
					 UsersService.save($.param ({
							username : $scope.user.username,
							imgUrl : files[0].name
						 }));
					 
					 $scope.user.imgUrl = files[0].name;
						
                   }
				
				
                
					
			};
			
			$scope.files = null;
			
		} ]);
