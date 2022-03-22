app.controller('ImgPickerCtrl', function($scope, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker, $cordovaFile) {
	$scope.images = [];
console.log('in image picker controller');
	$scope.addMedia = function() {
	    $scope.hideSheet = $ionicActionSheet.show({
	      	buttons: [
	        	{ text: 'Take photo' },
	        	{ text: 'Photo from library' }
	      	],
	      	titleText: 'Add images',
	      	cancelText: 'Cancel',
	      	buttonClicked: function(index) {
	        	$scope.hideSheet();

		        if(index==0){
			        var options = {
				      	destinationType: Camera.DestinationType.FILE_URI,
				      	sourceType: Camera.PictureSourceType.CAMERA,
				      	targetWidth: 600,
      					targetHeight: 100,
      					quality: 100
				    };

			        $cordovaCamera.getPicture(options).then(function(imageUrl) {
			        	console.log(imageUrl);
				        $scope.images.push(imageUrl);

						var win = function (r) {
							console.log("Code = " + r.responseCode);
							console.log("Response = " + r.response);
							console.log("Sent = " + r.bytesSent);
						};

						var fail = function (error) {
							alert("An error has occurred: Code = " + error.code);
							console.log("upload error source " + error.source);
							console.log("upload error target " + error.target);
						};
						var options2 = new FileUploadOptions();
						options.fileKey = "file";
						options.fileName = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
						options.mimeType = "img/jpg";

						var params = {};
						params.value1 = "test";
						params.value2 = "param";

						options.params = params;

						var ft = new FileTransfer();
						ft.upload(imageUrl, encodeURI("http://www.s1tec.com/api/attendance"), win, fail, options2);
				    });

			    }else{
			    	var options = {
					   maximumImagesCount: 10,
					   width: 800,
					   height: 800,
					   quality: 80
					  };

			    	$cordovaImagePicker.getPictures(options)
					    .then(function (results) {
					      for (var i = 0; i < results.length; i++) {
					        $scope.images.push(results[i]);
					        console.log(results[i]);
					      }
				    }, function(err) {
				    	console.log(err);
				    });
		    	}
			}
	    });
	}

	// Active INK Effect
    ionic.material.ink.displayEffect();
})