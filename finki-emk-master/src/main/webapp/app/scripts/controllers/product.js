FirstApp
		.controller(
				'ProductController',
				[
						'$scope',
						'crudService',
						'$routeParams',
						'toaster',
						'settings',
						'ngTableParams',
						'$filter',
						'$modal',
						function($scope, crudService, $routeParams, toaster,
								settings, ngTableParams, $filter, $modal) {

						
							var service = crudService('products');
							var categoryService = crudService('categories');
							var typeService = crudService('types');

							categoryService.query(function(data) {
								categories = data;

								var catNames = [];
								angular.forEach(categories, function(val, key) {
									catNames.push(val.name);
								});

								$scope.catNames = catNames;
							});
							
							typeService.query(function(data) {
								types = data;
								
								
								
								var typeNames = [];
								angular.forEach(types, function(val, key) {
									typeNames.push(val.name);
								});
								console.log(typeNames);
								$scope.typeNames = typeNames;
							});

							var data = [];

							data = service.query(function() {
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

							$scope.edit = function(id) {
								$scope.entity = service.get({
									id : id
								});
							};

							if ($routeParams.id) {
								$scope.entity = service.get({
									id : $routeParams.id
								});
							} else {
								$scope.entity = {};
							}

							$scope.save = function() {
								service.save($scope.entity, function(da) {
									$scope.entity = {};
									data = service.query();
									data.$promise.then(function(data) {
										$scope.tableParams.reload();
									});

								});
							};

							$scope.remove = function(id) {
								service
										.remove(
												{
													id : id
												},
												function() {
													data = service.query();
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
								template : 'views/productModalContent.html',
								scope : $scope,
								show: false
							});
							
							$scope.ok=function(){
								$scope.save();
								modalInstance.hide();
							}
							
							$scope.cancel = function() {
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
