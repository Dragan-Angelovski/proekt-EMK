FirstApp.controller('TypeController',
[
	'$scope',
	'$rootScope',
	'TypeService',
	'$routeParams',
	'toaster',
	function($scope, $rootScope, TypeService, $routeParams, toaster) {
		var service = TypeService;

		function compare(a,b) {
            if (a.category.name < b.category.name)
              return -1;
            if (a.category.name > b.category.name)
              return 1;
            return 0;
        }

		$scope.entities = [];

        function loadTypes() {
            service.query(function(data) {
            $scope.entities = data;
            $scope.entities.sort(compare);
            });
        }

        loadTypes();

		if ($routeParams.id) {
			$scope.entity = service.get({
				id : $routeParams.id
			});
		} else {
			$scope.entity = {};
		}

		$scope.edit = function(id) {
			$scope.entity = service.get({
				id : id
			});
		};

		$scope.save = function() {
			if(!$scope.entity.name) {
		        toaster.pop('error', 'Add error', "Input fields are empty!");
		        return;
            }
            if(!$scope.entity.category) {
	            toaster.pop('error', 'Add error', "Input fields are empty!");
	            return;
            }

            //capitalize first letter
            var name = $scope.entity.name;
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            $scope.entity.name = name;

			service.save($scope.entity, function(data) {
				loadTypes();
				var cat = $scope.entity.category;
				$scope.entity = {};
				$rootScope.sideNav.catTypes[cat.id] = [];
				service.findByCategory({
					id : cat.id
				}, function(data) {
					$rootScope.sideNav.catTypes[cat.id] = data;
				})
				toaster.pop('success', 'Add successful', "Added type.");
			},
			function (res) {
                if (res.status == 500) {
                    toaster.pop(
                        'error',
                        'Add error',
                        "Type name already exist!"
                    );
                }
            });
		};

		$scope.remove = function(id, catId) {
			service.remove({id : id},
				function() {
	                loadTypes();
                    $rootScope.sideNav.catTypes[catId] = [];
                    service.findByCategory({
                        id : catId
                    }, function(data) {
                        $rootScope.sideNav.catTypes[catId] = data;
                    })
                    toaster.pop('success', 'Remove successful', "Removed type.");
				},
				function(res) {
					if (res.status == 500) {
						toaster.pop(
							'error',
							'Removing error',
							"Object cant be remove there is another object with foreign key pointing to this object!"
						);
					}
				}
			);
		};
	}
]);
