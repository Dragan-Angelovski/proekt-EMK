FirstApp.controller('CategoryController',
[
    '$scope',
    'crudService',
    '$rootScope',
    'TypeService',
    'toaster',
	function($scope, crudService, $rootScope, TypeService, toaster) {
        var categoryService = crudService('categories');

        function loadCategories() {
            $scope.entities = [];
            categoryService.query(function(data) {
                $scope.entities = data;
            });
        }

        $scope.entities = [];
        loadCategories();

        $scope.entity = {};

        $scope.edit = function(id) {
            $scope.entity = categoryService.get({
                id : id
            });
        };

        $scope.save = function() {

            if(!$scope.entity.name) {
                toaster.pop('error', 'Add error', "Category name is empty!");
                return;
            }

            //capitalize first letter
            var name = $scope.entity.name;
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            $scope.entity.name = name;


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
            },
            function (res) {
                if (res.status == 500) {
                    toaster.pop(
                        'error',
                        'Add error',
                        "Category name already exist!"
                    );
                }
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
                    toaster.pop(
                        'error',
                        'Removing error',
                        "Object cant be remove there is another object with foreign key pointing to this object!"
                    );
                }
            });
        };
    }
]);
