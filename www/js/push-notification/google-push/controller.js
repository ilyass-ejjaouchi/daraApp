app.controller('GooglePush', function($scope, $cordovaDialogs, $ionicPlatform, Push) {
	var token = [window.localStorage.getItem('ionium-token')];

	$scope.data = {
		"registration_ids": token,
		"data": {
			title: 'Ionic Premium',
			message: '',
			image : "www/img/logo.png",
			soundname: "default",
			'content-available' : "1"		// NOTIFICATION ON FOREGROUND APPS
		}
	};

	$scope.sendNotif = function() {
        Push.send(JSON.stringify($scope.data), 'https://android.googleapis.com/gcm/send').then(function(x){      	
	      	console.log(x.results[0].error);
			$scope.data.data.message = '';
        }, function(err){
        	console.log(err);
        });
    };
})