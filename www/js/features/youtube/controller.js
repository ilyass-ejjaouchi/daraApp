app.controller('YoutubeCtrl', function($scope, $http, $ionicLoading) {
	var params = {
		key: window.global.GCM_SERVER_KEY,
		type: 'video',
		maxResults: 5,
		part: 'id,snippet',
		q: 'ionic',
		order: 'viewCount',
		channelId: 'UChYheBnVeCfhCmqZfCUdJQw'
	}

	$ionicLoading.show();
	$http.get('https://www.googleapis.com/youtube/v3/search', {params: params}).success(function(x){
		$scope.data = x.items;
		$ionicLoading.hide();
	});
})