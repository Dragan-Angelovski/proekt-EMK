FirstApp.controller('CategoryController', [ '$scope', 'crudService', '$rootScope', 'TypeService', 'toaster',
		function($scope, crudService, $rootScope, TypeService, toaster) {

      var categoryService = crudService('categories');
			$scope.entities = categoryService.query();
			$scope.entity = {};

			$scope.edit = function(id) {
				$scope.entity = categoryService.get({
					id : id
				});
			};

			$scope.save = function() {
				categoryService.save($scope.entity, function() {
					$scope.entity = {};

					categoryService.query(function(data) {
            $scope.entities = data;
            $rootScope.sideNav.categories = $scope.entities;

            $rootScope.sideNav.catTypes = [];
            angular.forEach($rootScope.sideNav.categories, function(cat) {
              TypeService.findByCategory({
                id : cat.id
              }, function(data) {
                $rootScope.sideNav.catTypes[cat.id] = data;
              });
            });
					});
					toaster.pop('success', 'Add successful', "Added category.");
				});
			};

			$scope.remove = function(id) {
				categoryService.remove({
					id : id
				}, function() {
				  categoryService.query(function(data) {
            $scope.entities = data;
            $rootScope.sideNav.categories = $scope.entities;

            $rootScope.sideNav.catTypes = [];
            angular.forEach($rootScope.sideNav.categories, function(cat) {
              TypeService.findByCategory({
                id : cat.id
              }, function(data) {
                $rootScope.sideNav.catTypes[cat.id] = data;
              });
            });
				  });
				  toaster.pop('success', 'Remove successful', "Removed category.");
				},
				function (res) {
          if (res.status == 500) {
            // alert('ne moze da se
            // izbrise!');
            toaster
              .pop(
              'error',
              'Removing error',
              "Category cant be removed there are Type objects connected to this category!");
          }
        });
			};

		} ]);
