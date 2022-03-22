app.controller('ToastCtrl', function($scope, $cordovaToast) {
	$scope.showShortTop = function(){
		$cordovaToast.showShortTop('Here is a message').then(function(success) {
		    // success
		}, function (error) {
		    // error
		});
	}

	$scope.showShortCenter = function(){
		$cordovaToast.showShortCenter('Here is a message').then(function(success) {
		    // success
		}, function (error) {
		    // error
		});
	}

	$scope.showShortBottom = function(){
		$cordovaToast.showShortBottom('Here is a message').then(function(success) {
		    // success
		}, function (error) {
		    // error
		});
	}
	 // Active INK Effect
    ionic.material.ink.displayEffect();
})