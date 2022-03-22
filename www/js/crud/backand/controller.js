app.controller('BackandCtrl', function($scope, $ionicLoading, $cordovaDialogs, BackandService) {
	function getAllTodos() {
		$ionicLoading.show();
		BackandService.read('todos').then(function (result) {
		  	$scope.todos = result.data.data;
		  	$ionicLoading.hide();
		});
	}
	 
	$scope.deleteTodo = function(id) {
		$cordovaDialogs.confirm('Are you sure want to delete this?', 'Delete Backand Todo', ['OK','Cancel'])
    		.then(function(btnIndex) {
    			if(btnIndex==1){
					BackandService.remove('todos', id).then(function (result) {
				  		getAllTodos();
					});
				}else return false;
		});
	}
	 
	getAllTodos();
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