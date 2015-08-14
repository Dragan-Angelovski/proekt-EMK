FirstApp.controller('TestController', [ '$scope', '$upload',  'crudService', function($scope, $upload, crudService){
	
	var service = crudService();
	
	$scope.save = function($files){
		service.save($scope.entity, function($files){
		});
		
	};
	
	$scope.onFileSelect = function($files) {

	    //$files: an array of files selected, each file has name, size, and type.
	    for (var i = 0; i < $files.length; i++) {
	      var file = $files[i];
	      $scope.upload = $upload.upload({
	        url: 'http://localhost:9955/green-market/upload', //upload.php script, node.js route, or servlet url
	        file: file,
	      }).progress(function(evt) {
	        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	      }).success(function(data, status, headers, config) {
	        // file is uploaded successfully
	        console.log(data);
	      });
	    }
	  };
}]);