app.controller('SocialCtrl', function($scope, $http) {
	$scope.shareThis = function(){

		var onSuccess = function(result) {
		  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
		  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
		}

		var onError = function(msg) {
		  console.log("Sharing failed with message: " + msg);
		}

		document.addEventListener("deviceready", function() {
			console.log(window.plugins.socialsharing);
			window.plugins.socialsharing.share('Camera Old only $250 (50% off). Get it now!', 'Share This', 'www/img/ecommerce/camera-new.jpg', null, onSuccess, onError);
		}, false);
	};
})