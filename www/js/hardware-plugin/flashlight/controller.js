app.controller('FlashCtrl', function($scope, $cordovaFlashlight) {
	$scope.on = true;

	$cordovaFlashlight.available().then(function(availability) {
		$scope.avail = availability;
		$cordovaFlashlight.switchOn().then(function(x){});
	}, function () {
		$scope.avail = false;
	});

	$scope.startFlash = function(){
		if($scope.on){
			$cordovaFlashlight.switchOff()
			.then(
			  function (success) { $scope.on = false; },
			  function (error) { $scope.on = false; });

		}else{
			$cordovaFlashlight.switchOn()
			.then(
			  function (success) {
			  	$scope.on = true;
			  },
			  function (error) { 
			  	$scope.on = true;
			  });
		}
	};	
	// Active INK Effect
    ionic.material.ink.displayEffect();
})