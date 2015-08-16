FirstApp.controller('EditSellersController',
  [
    '$scope',
    'crudService',
    '$routeParams',
    'toaster',
    'ngTableParams',
    '$filter',
    '$modal',
	'$upload',
    function ($scope, crudService, $routeParams, toaster, ngTableParams, $filter, $modal, $upload) {
    	
        var sellerService = crudService('sellers');
        var userService = crudService('users');
        
        var data = sellerService.query(function(){
            tableParamsLoad();
        });
    
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

    
      
     
      
      
      $scope.entities = sellerService.query();
      if ($routeParams.id) {
        $scope.entity = service.get({
          id: $routeParams.id
        });
      } else {
        $scope.entity = {};
      }

      $scope.edit = function (id) {
        $scope.entity = userService.get({
          id: id
        });
      };
      console.log($scope.entity);

      $scope.save = function () {
        userService.save($scope.entity, function (data) {
        	console.log(data);
          $scope.entity = {};
          $scope.entities = userService.query();
        });
      };
      
      if ($routeParams.id) {
			$scope.entity = userService.get({
				id : $routeParams.id
			});
		} else {
			$scope.entity = {};
		}

      $scope.remove = function(id) {
			sellerService
					.remove(
							{
								id : id
							},
							function() {
								data = sellerService.query();
								data.$promise
										.then(function(data) {
											$scope.tableParams
													.reload();
										});
							},
							function(res) {
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

      
      var modalInstance = $modal({
    	  template: 'views/sellerModalContent.html',
    	  scope: $scope,
    	  show: false
      });
      
      $scope.createSeller = function(){
    	  $scope.save();
    	  modalInstance.hide();
      };
      
      $scope.cancel = function(){
    	  modalInstance.hide();
      }
      
      $scope.showEdit = function(entity) {
			if(entity != null) {
				$scope.entity = $.extend( true, {}, entity );									
			} else {
				$scope.entity = {};
			}
			modalInstance.$promise.then(modalInstance.show);
		};
      

    }]);
