FirstApp.directive('imageDisplay', function() {
	return {
		restrict : 'AE',
		scope : {
			entity : '='
		},
		link : function(scope, element, attr) {
			console.log(arguments);
		},
		controller : function($scope) {

		},
		templateUrl : 'directives/image-display.html'
	};
});