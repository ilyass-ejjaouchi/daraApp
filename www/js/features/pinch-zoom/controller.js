app.controller('PinchZoomCtrl', function($scope, $http, $ionicModal, $window, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
	$scope.zoomMin = 1;

    $scope.screenHeight =  $window.innerHeight;
    
    $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/features/zoom.html');
    };

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
    };

    $scope.updateSlideStatus = function(slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;

        if (zoomFactor == $scope.zoomMin)
          $ionicSlideBoxDelegate.enableSlide(true);
        else 
          $ionicSlideBoxDelegate.enableSlide(false);  
        $ionicSlideBoxDelegate.update();      
    };
})