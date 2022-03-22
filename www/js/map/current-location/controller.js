app.controller('CurrentLocationCtrl', function($scope, $cordovaGeolocation, $ionicModal, $timeout) {
	var options = {timeout: 10000, enableHighAccuracy: true};
 
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		var mapOptions = {
		  center: latLng,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		var marker = new google.maps.Marker({
          position: latLng,
          animation: google.maps.Animation.DROP,
          map: map
        });

		var infoWindow = new google.maps.InfoWindow({
			content: "Here Iam!"
		});

		infoWindow.open(map, marker);

		google.maps.event.addListener(marker, 'click', function () {
			infoWindow.open(map, marker);
		});

	}, function(error){
		console.log("Could not get location");
	});
 	
 	// Active INK Effect
    ionic.material.ink.displayEffect();
 	
})