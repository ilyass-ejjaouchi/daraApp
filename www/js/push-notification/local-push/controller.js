app.controller('LocalPush', function($scope, $ionicPlatform, $cordovaLocalNotification) {
	$scope.data = {q: ''};

	$ionicPlatform.ready(function () {
		$scope.startNotif = function() {
	        var alarmTime = new Date();
	        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
	        $cordovaLocalNotification.schedule({
	            id: "1234",
	            text: $scope.data.q,
	            icon: 'res://icon',
	            color: 'FF0000',
	            smallIcon: 'res://cordova',
	            sound: 'file://sound/ding.mp3',
	            title: "Call Notification"
	        }).then(function () {
	            console.log("The notification has been set");
	        });
	    };
	})
})