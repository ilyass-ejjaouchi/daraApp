app.controller('PullCtrl', function($scope, $http, $ionicLoading) {

	$scope.loadmore = function(){
		$ionicLoading.show();
		$http.get('https://randomuser.me/api/?results=10').success(function(x){
			$scope.data = x.results;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');	
		});
	};

	$scope.loadmore();
})
