FirstApp.controller('EditSellersController',
  [
    '$scope',
    'crudService',
    '$routeParams',
    'toaster',
    'ngTableParams',
    '$filter',
    function ($scope, crudService, $routeParams, toaster, ngTableParams, $filter) {
    
    	var tableParamsLoad = function() {
			$scope.tableParams = new ngTableParams(
					{
						page : 1,
						count : 5,
						sorting : {
							name : 'asc'
						}
					},
					{
						total : data.length,
						counts : [2, 5, 10, 20],

						// groupBy: 'price',
						getData : function($defer, params) {
							
							var filteredData = params.filter() ? $filter(
									'filter')(data,
									params.filter()) : data;

							var orderedData = params
									.sorting() ? $filter(
									'orderBy')(
									filteredData,
									params.orderBy())
									: filteredData;

							params
									.total(orderedData.length); // set
																// total
																// for
																// recalc
																// paginati

							$defer
									.resolve(orderedData
											.slice(
													(params
															.page() - 1)
															* params
																	.count(),
													params
															.page()
															* params
																	.count()));
						}
					}, function(error) {
						console.log('errror', error);
					});
		}

    	
      var service = crudService('sellers');
      
      var data = [{name:"Mitko"},{name:"Petko"}];
      
      tableParamsLoad();
      
      $scope.entities = service.query();
      if ($routeParams.id) {
        $scope.entity = service.get({
          id: $routeParams.id
        });
      } else {
        $scope.entity = {};
      }

      $scope.edit = function (id) {
        $scope.entity = service.get({
          id: id
        });
      };

      $scope.save = function () {
        service.save($scope.entity, function (data) {
          $scope.entity = {};
          $scope.entities = service.query();
        });
      };

      $scope.remove = function (id) {
        service
          .remove(
          {
            id: id
          },
          function () {
            $scope.entities = service
              .query();
          },
          function (res) {
            if (res.status == 500) {
              // alert('ne moze da se
              // izbrise!');
              toaster
                .pop(
                'error',
                'Deleting error',
                "Ne moze da se izbrise objektot. Postoi drug objekt so nadvoresen kluc koj pokazuva kon nego!");
            }
          });

      };

    }]);
