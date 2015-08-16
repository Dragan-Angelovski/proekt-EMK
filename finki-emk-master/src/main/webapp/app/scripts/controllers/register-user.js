FirstApp.controller('RegisterUserController', [
  '$scope',
  '$rootScope',
  '$location',
  '$filter',
  'UsersService',
  'toaster',
  '$upload',
  function($scope, $rootScope, $location, $filter, UsersService, toaster, $upload) {
   
	  $scope.image = null;
	  $scope.message = "";
	  
	  $scope.onFileSelect = function($files){
		  $scope.image = $files;
	  }

    $scope.createAccount = function() {
    	
    	if($scope.image != null){
    		var files = $scope.image;
    		
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
	    	UsersService.create($.param({
	            username: $scope.username,
	            password: $scope.password,          
	            fistName: $scope.fistName,
	            lastName: $scope.lastName,
	            email: $scope.email,
	            imgUrl: files[0].name
	            
	          }), function(res) {
	            toaster.pop(res.success, res.success,
	              res.message);
	            if(res.success == "success"){
	            	$location.path("/login");
	            }
	          });
    	}
    	else{
    		UsersService.create($.param({
	            username: $scope.username,
	            password: $scope.password,          
	            fistName: $scope.fistName,
	            lastName: $scope.lastName,
	            email: $scope.email,
	            imgUrl: "seller.png"
	            
	          }), function(res){

    			toaster.pop(res.success, res.success,
	              res.message);
    			if(res.success == "success"){
	            	$location.path("/login");
	            }
    		});
    		
    	}
      
    };
  }]);
