app.controller('LocalCreateCtrl', function($scope, $state) {
	var item = window.localStorage.getItem('localstorage') ? JSON.parse(window.localStorage.getItem('localstorage')) : [];

	$scope.data = {};
	
	$scope.CrudAdd = function(){
		$scope.data.id = Math.floor(Math.random() * 99) + 101;
		item.push($scope.data);
		window.localStorage.setItem('localstorage', JSON.stringify(item));
		$state.go('app.localstorage');
	}
})

app.controller('LocalEditCtrl', function($scope, $state, $stateParams) {
	var item = window.localStorage.getItem('localstorage') ? JSON.parse(window.localStorage.getItem('localstorage')) : [];

	for(var i in item){
		if(item[i].id == $stateParams.id)
			$scope.data = item[i];
	}

	$scope.CrudEdit = function(id){
		for(var i in item){
			if(item[i].id == $stateParams.id){
				item[i].title = $scope.data.title;
				item[i].notes	= $scope.data.notes;
			}
		}
		window.localStorage.setItem('localstorage', JSON.stringify(item));
		$state.go('app.localstorage');
	}
})

app.controller('LocalStorageCtrl', function($scope, $cordovaDialogs) {
	$scope.data = window.localStorage.getItem('localstorage') ? JSON.parse(window.localStorage.getItem('localstorage')) : [];

	$scope.CrudDelete = function(index){
		$cordovaDialogs.confirm('Are you sure want to delete this?', 'Delete Local Todo', ['OK','Cancel'])
		    .then(function(btnIndex) {
		      // no button = 0, 'OK' = 1, 'Cancel' = 2
		      if(btnIndex==1){
		      	$scope.data.splice(index, 1);
				window.localStorage.setItem('localstorage', JSON.stringify($scope.data));
		      }else return false;
	    });		
	}
})