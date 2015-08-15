FirstApp.controller('RegisterUserController', [
  '$scope',
  '$rootScope',
  '$location',
  '$filter',
  'UsersService',
  'toaster',
  function($scope, $rootScope, $location, $filter, UsersService, toaster) {
   

    $scope.createAccount = function() {
      UsersService.create($.param({
          username: $scope.username,
          password: $scope.password,          
          fistName: $scope.fistName,
          lastName: $scope.lastName,
          email: $scope.email          
          
        }), 
               
        function() {
          toaster.pop('error', $filter('translate')('generic.login_error'),
            $filter('translate')('generic.invalid_username_or_password'));
        });
      console.log($scope.username);
    };
  }]);
