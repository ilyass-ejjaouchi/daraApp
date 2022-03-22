// This directive use in Youtube
app.directive('youtube', function(){
	return {
		restrict: 'E',
		scope: {
			id: '=?'
		},
		template: '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="{{id | trusted}}"></iframe></div>'
	}
})