app.controller('VibraCtrl', function($scope, $cordovaVibration) {
	$scope.startVibra = function(){
		$cordovaVibration.vibrate(100);
	};
	
	// Active INK Effect
    ionic.material.ink.displayEffect();
})