FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope', '$upload' , 'crudService',
		function($scope, UsersService, $routeParams, $rootScope, $upload, crudService) {

			
			var stallService = crudService('stalls');
			var sellerService = crudService('sellers');
			
			//POST
			var userImage = null;
			UsersService.username($.param ({
				username : $rootScope.user.username
				
			}), function(data){
				$scope.user = data;
			});
			
			
			
			$scope.editorEnabled = false;
			
			
			$scope.edit = function(){
				$scope.editorEnabled = true;
				$scope.editFistName = $scope.user.fistName;
				$scope.editLastName = $scope.user.lastName;
				$scope.editEmail = $scope.user.email;	
			}
			
			$scope.cancle = function(){
				$scope.editorEnabled = false;
				$scope.user.imgUrl = userImage;
			}
			
			
			//GET
			/*$scope.user = UsersService.get({
				username : $routeParams.username
			});
			*/
			$scope.files = null;
			
			$scope.onFileSelect = function($files){
				$scope.files = $files;
				userImage = $scope.user.imgUrl;
				$scope.user.imgUrl = "";
				$scope.user.imgUrl = $scope.files[0].name;
			}
			
			
			$scope.save = function() {
				
				
				
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
					 $scope.user.imgUrl = files[0].name;
					 $scope.user.fistName = $scope.editFistName;
					 $scope.user.lastName = $scope.editLastName;
					 $scope.user.email = $scope.editEmail;
				 	
					 UsersService.save($.param ({
						 	username : $scope.user.username,
							fistname : $scope.editFistName,
							lastname : $scope.editLastName,
							email : $scope.editEmail,
							imgUrl : files[0].name
						 }));
					 
					 
					 $scope.editorEnabled = false;
                   }
				
				else{
					
					 UsersService.save($.param ({
						 	username : $scope.user.username,
							fistname : $scope.editFistName,
							lastname : $scope.editLastName,
							email : $scope.editEmail,
							imgUrl : $scope.user.imgUrl
						 }));
					 
					 $scope.user.fistName = $scope.editFistName;
					 $scope.user.lastName = $scope.editLastName;
					 $scope.user.email = $scope.editEmail;
					 $scope.editorEnabled = false;
					
				}
				
			
					
			};
			
			
			
		} ]);
