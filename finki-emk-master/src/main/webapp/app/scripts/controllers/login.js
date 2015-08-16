FirstApp.controller('LoginController', [
  '$scope',
  '$rootScope',
  '$location',
  '$filter',
  'UserService',
  'SellerService',
  'toaster',
  'UsersService',
  function($scope, $rootScope, $location, $filter, UserService, SellerService, toaster, UsersService) {
    $scope.rememberMe = false;

    $scope.login = function() {
      UserService.authenticate($.param({
          username: $scope.username,
          password: $scope.password,
          rememberMe: $scope.rememberMe
        }), function(authenticationResult) {
          $rootScope.authToken = authenticationResult.token;
          UserService.get(function(u) {
            $rootScope.user = u;
            UsersService.username($.param ({
            	username : $rootScope.user.username
            }),function(data){
            
            	if(data.role == "ROLE_SELLERS"){
                	  SellerService.findByUserId({
                		  userId : data.id
                	  },function(data){
                		  $rootScope.seller = data;
                		  console.log($rootScope.seller);
                	  });
                  }
                  else{
                  		$rootScope.seller = null;
                  }
            });
            
          });
          
          $rootScope.loginAction = true;
          if($rootScope.returnPath
            && $rootScope.returnPath != "/login") {
            $location.path($rootScope.returnPath);
            delete $rootScope.returnPath;
          } else {
            $location.path("/");
          }
        },
        function() {
          toaster.pop('error', $filter('translate')('generic.login_error'),
            $filter('translate')('generic.invalid_username_or_password'));
        });
    };
  }]);
