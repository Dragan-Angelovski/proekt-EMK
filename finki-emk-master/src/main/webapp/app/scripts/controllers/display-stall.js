FirstApp.controller('DisplayStallsController', [ '$scope', 'crudService',
		function($scope, crudService) {

      var StallService = crudService('stalls');
			$scope.entities = StallService.query();
			$scope.entity = {};

			$scope.edit = function(id) {
				$scope.entity = StallService.get({
					id : id
				});
			};

			$scope.save = function() {
				StallService.save($scope.entity, function(data) {
					$scope.entity = {};
					$scope.entities = StallService.query();
				});
			};

			$scope.remove = function(id) {
				StallService.remove({
					id : id
				}, function() {
					$scope.entities = StallService.query();
				});
			};

		} ]);
