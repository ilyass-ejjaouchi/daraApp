app.controller('LoginCtrl', function($scope, $ionicLoading, $cordovaDialogs, BackandService) {

  $scope.user = {};

  $scope.user.email = "";
  $scope.user.password = "";
  // $scope.user.password = "12345";

  $scope.doLogIn = function(){
    console.log("doing log in");

    $ionicLoading.show({
      template: 'Loging in...'
    });

    $timeout(function(){
      // Simulate login OK
      // $state.go('main.app.feed.fashion');
      // $ionicLoading.hide();

      // Simulate login ERROR
      $scope.error = "This is an error message";
      $ionicLoading.hide();
    }, 800);
  };
})

app.controller('BackandCreateCtrl', function($scope, $state, $ionicLoading, $cordovaDialogs, BackandService) {
	$scope.data = {};

	$scope.addTodo = function() {
      	$ionicLoading.show();
      	BackandService.create('todos', $scope.data).then(function(result) {
	  		$ionicLoading.hide();
	  		$scope.data = {};
	  		$state.go('app.backand');
		});
	}
})

app.controller('BackandEditCtrl', function($scope, $state, $stateParams, $ionicLoading, $cordovaDialogs, BackandService) {
	$scope.data = {};
	var id = $stateParams.id;

	$ionicLoading.show();
	BackandService.readById('todos', id).then(function (result) {
		$ionicLoading.hide();
		$scope.data = result.data;
	});

	$scope.updateTodo = function() {
		$ionicLoading.show();
      	BackandService.update('todos', $stateParams.id, $scope.data).then(function (result) {
      		$ionicLoading.hide();
      		$scope.data = {};
	  		$state.go('app.backand');
		});

	}
})
