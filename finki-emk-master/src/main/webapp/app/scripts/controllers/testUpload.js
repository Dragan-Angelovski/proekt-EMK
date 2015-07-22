FirstApp.controller('TestController', [ '$scope', '$upload',  function($scope, $upload){
	
	/*$scope.onFileSelect = function($files) {
	    for (var i = 0; i < $files.length; i++) {
	        var file = $files[i];
	    var test = {
	        description:"Test",
	        status: "REJECTED"
	        };
	    var fd = new FormData();
	    fd.append('data', angular.toJson(test));
	    fd.append("file", file);
	    $http({
	        method: 'POST',
	        url: 'http://localhost:9955/green-market/upload',
	        headers: {'Content-Type': 'multipart/form-data'},
	        data: fd,
	        transformRequest: function(data, headersGetterFunction){
	        	return data;
	        }
	       })
	       .success(function(data, status) {
	             alert("success");
	       });
	    }
	};*/
	
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