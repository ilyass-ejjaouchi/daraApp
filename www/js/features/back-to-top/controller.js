app.controller('BackToTopCtrl', function($scope, $http) {
	$scope.data = [];

	$scope.loadmore = function(){
		$http.get('https://randomuser.me/api/?results=10').success(function(x){
			$scope.data = $scope.data.concat(x.results);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.loadmore();
})
