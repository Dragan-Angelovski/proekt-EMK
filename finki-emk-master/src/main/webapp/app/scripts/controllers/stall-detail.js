FirstApp.controller('DetailStallController', [ '$scope', 'crudService',
		'$routeParams', 'ProductService', '$rootScope', '$modal', '$upload', 'toaster',
		function($scope, crudService, $routeParams, ProductService, $rootScope, $modal, $upload, toaster) {

			console.log($rootScope.seller);
			var stallId = $routeParams.id;
			var stallService = crudService('stalls');
			var productService = crudService('products');
			$scope.entity = {};


			$scope.stall = stallService.get({
				id : stallId
			});
			$scope.products = ProductService.findByStall({
				id : stallId
			});
				
			$scope.onFileSelect = function($files){
				$scope.files = $files;
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
                	   	$scope.entity.imgUrl = "file.jpg";
                   }
						
						$scope.entity.stall = $scope.stall;
						$scope.entity.seller = $rootScope.seller;
						$scope.entity.category = $scope.entity.type.category;
				productService.save($scope.entity, function() {
					$scope.entity = {};
					
					$scope.products = ProductService.findByStall({
						id : stallId
					});
					

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
			
			$scope.addToStall = function(){
				modalInstance.$promise.then(modalInstance.show);
			}
			
			$scope.remove = function(product) {
				productService
						.remove(
								{
									id : product.id
								},
								function() {
									$scope.products = ProductService.findByStall({
										id : stallId
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
		} ]);
