app.controller('DevInfoCtrl', function($scope, $cordovaDevice) {
	document.addEventListener("deviceready", function () {
		var x = $cordovaDevice.getDevice();
		$scope.cordova = x.cordova;
		$scope.model = x.model;
		$scope.platform = x.platform;
		$scope.uuid = x.uuid;
		$scope.version = x.version;
	});
})
