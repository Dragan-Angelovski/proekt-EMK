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
						'$upload',
						function($scope, crudService, $routeParams, toaster,
								settings, ngTableParams, $filter, $modal, $upload) {




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

							$scope.entities = data;
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
								if($scope.files != null) {
									var files = $scope.files;
									$scope.files=null;



								 for (var i = 0; i < files.length; i++) {
                                      var file = files[i];
                                      $scope.upload = $upload.upload({
                                        url: 'http://localhost:9955/green-market/upload_product',
                                        method: 'POST',//upload.php script, node.js route, or servlet url
                                        file: file,
                                      }).progress(function(evt) {
                                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                                      }).success(function(data, status, headers, config) {
                                        // file is uploaded successfully
                                        console.log(data);
                                      });
                                   }
										$scope.entity.imgUrl = files[0].name;
                                   } else {

                                   }

									$scope.entity.category = $scope.entity.type.category;
								service.save($scope.entity, function(da) {
									$scope.entity = {};
									data = service.query();
									data.$promise.then(function(data) {
										$scope.tableParams.reload();
									});

								});
							};
							
							/* $scope.onFileSelect = function(image) {
						            if (angular.isArray(image)) {
						                image = image[0];
						            }

						            // This is how I handle file types in client side
						            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
						                alert('Only PNG and JPEG are accepted.');
						                return;
						            }

						            $scope.uploadInProgress = true;
						            $scope.uploadProgress = 0;

						            $scope.upload = $upload.upload({
						                url: '/upload/image',
						                method: 'POST',
						                file: image
						            }).progress(function(event) {
						                $scope.uploadProgress = Math.floor(event.loaded / event.total);
						                $scope.$apply();
						            }).success(function(data, status, headers, config) {
						                $scope.uploadInProgress = false;
						                // If you need uploaded file immediately 
						                $scope.uploadedImage = JSON.parse(data);      
						            }).error(function(err) {
						                $scope.uploadInProgress = false;
						                console.log('Error uploading file: ' + err.message || err);
						            });
						        };*/

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

							$scope.test = function() {
                                console.log($scope.files);
                                console.log($scope.files[0].name);
                            }
							$scope.files = null;

							$scope.onFileSelect = function($files) {
								$scope.files = $files;
                            	    //$files: an array of files selected, each file has name, size, and type.

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
