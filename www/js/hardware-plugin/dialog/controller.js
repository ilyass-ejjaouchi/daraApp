
app.controller('DialogCtrl', function($scope, $cordovaDialogs) {
	$scope.showAlert = function(){
		$cordovaDialogs.alert('Here is a message', 'Warning!', 'OK').then(function(){})
	}
	$scope.showConfirm = function(){
		$cordovaDialogs.confirm('Is this useful for you?', 'Confirm', ['Yes', 'No']).then(function(btn){
			if(btn==1) alert('You choose Yes');
			else if(btn==2) alert('You choose No');
		})
	}
	$scope.showPrompt = function(){
		$cordovaDialogs.prompt('Enter your name', 'Your name', ['Save', 'Cancel']).then(function(result){
			if(result.buttonIndex==1)
				alert('Your name is: ' + result.input1);
		})
	}
})
