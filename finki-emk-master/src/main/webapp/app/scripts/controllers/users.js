FirstApp.controller('userController', [ '$scope', 'UsersService',
		'$routeParams', '$rootScope', '$upload' , 'SellerService', 'StallService',
		function($scope, UsersService, $routeParams, $rootScope, $upload, SellerService, StallService) {

			if($scope.user.role == "ROLE_ADMIN"){
				StallService.query(function(data){
					$scope.allStalls = data;
				});
				
			}
			
			//POST
			var userImage = "";
			UsersService.username($.param ({
				username : $rootScope.user.username
				
			}), function(data){
				$scope.user = data;
				userImage = $scope.user.imgUrl;
				
				if($scope.user.role == "ROLE_SELLERS"){
					SellerService.findByUserId({
						userId : $scope.user.id
						
					}, function(seller){
						console.log(seller);
						function compare(a,b) {
							if (a.number < b.number)
								return -1;
								if (a.number > b.number)
								return 1;
								return 0;
				            }
	
							StallService.findBySeller({
								id : seller.id
							}, function(data) {
								$scope.stalls = data;
								$scope.stalls.sort(compare);
							});
					});
				}
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
