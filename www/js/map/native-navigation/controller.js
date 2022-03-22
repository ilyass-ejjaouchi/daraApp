app.controller('NavigatorCtrl', function($scope, $cordovaLaunchNavigator) {
	$scope.launchNavigator = function() {
	    var destination = "Jakarta, Indonesia";
		var start = "Bandung, Indonesia";
	    $cordovaLaunchNavigator.navigate(destination, start).then(function() {
	      console.log("Navigator launched");
	    }, function (err) {
	      console.error(err);
	    });
	  };

	// Active INK Effect
    ionic.material.ink.displayEffect();
})