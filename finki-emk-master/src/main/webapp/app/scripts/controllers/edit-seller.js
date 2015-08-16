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
    	
    $scope.onFileSelect = function($files) {
			$scope.files = $files;
        	    //$files: an array of files selected, each file has name, size, and type.

        	  };
		
      $scope.save = function () {
    	  
    	  if($scope.files != null) {
				var files = $scope.files;
				$scope.files=null;
				
			 for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.upload = $upload.upload({
                  url: 'http://localhost:9955/green-market/user/upload_user',
                  method: 'POST',//upload.php script, node.js route, or servlet url
                  file: file,
                }).progress(function(evt) {
                  console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                  // file is uploaded successfully
                  console.log(data);
                });
             }
					$scope.entity.user.imgUrl = files[0].name;
             } else {
            	 if($scope.entity.user.imgUrl == null){
            		 $scope.entity.user.imgUrl = "seller.png";
            	 }
             }
    	  
    	  
    	  $scope.entity.user.role = "ROLE_SELLERS";
    	  sellerService.save($scope.entity, function() {
				$scope.entity = {};
				data = sellerService.query();
				data.$promise.then(function(data) {
					$scope.tableParams.reload();
				});

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
