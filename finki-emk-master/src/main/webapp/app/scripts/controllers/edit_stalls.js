FirstApp.controller('EditStallsController',
[
	'$scope',
	'$rootScope',
	'crudService',
	'toaster',
	function($scope, $rootScope, crudService, toaster) {
		var service = crudService("stalls");
		var sellerService = crudService("users");
		$scope.entity = {};

		$scope.renderSeller = function(val, markedText, item) {
		    var val = item['user']['fistName']+" "+item['user']['lastName'];
            return val;
		}

		$scope.renderSelected = function(baseText, markedText, item) {
			var markedText = item['user']['fistName']+" "+item['user']['lastName'];
            return markedText;
		}

		$scope.entities = [];

		function compare(a,b) {
            if (a.number < b.number)
              return -1;
            if (a.number > b.number)
              return 1;
            return 0;
        }

        function loadStalls() {
            service.query(function(data) {
            $scope.entities = data;
            $scope.entities.sort(compare);
            });
        }

        loadStalls();


		$scope.edit = function(id) {			
			$scope.entity = service.get({
				id : id
			});
		};

		$scope.save = function() {
			if(!$scope.entity.number) {
		        toaster.pop('error', 'Add error', "Input fields are empty!");
		        return;
            }
            if(!$scope.entity.seller) {
	            toaster.pop('error', 'Add error', "Input fields are empty!");
	            return;
            }


			service.save($scope.entity, function(data) {
				$scope.entity = {};
				loadStalls();
				toaster.pop('success', 'Add successful', "Added stall.");
			},
			function (res) {
                if (res.status == 500) {
                    toaster.pop(
                        'error',
                        'Add error',
                        "Stall number already exist!"
                    );
                }
            });
		};

		$scope.remove = function(id, catId) {
			service.remove({id : id},
				function() {
	                loadStalls();
	                toaster.pop('success', 'Remove successful', "Removed stall!");
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
