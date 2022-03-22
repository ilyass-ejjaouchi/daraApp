app.controller('NetInfoCtrl', function($scope, $rootScope, $cordovaNetwork) {
	document.addEventListener("deviceready", function () {
		$scope.type = $cordovaNetwork.getNetwork()
	    $scope.isOnline = $cordovaNetwork.isOnline()
	    $scope.isOffline = $cordovaNetwork.isOffline()

	    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
	      var onlineState = networkState;
	      //console.log(networkState);
	    })

	    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
	      var offlineState = networkState;
	      //console.log(networkState);
	    })
	});
})