app.controller('ComponentCtrl', function($scope) {

    // Active INK Effect
    ionic.material.ink.displayEffect();
})

app.controller('MotionCtrl', function($scope) {
	
	var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[2].className += ' animate-ripple';
        setTimeout(function() {
            ionic.material.motion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[2].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionic.material.motion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[2].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionic.material.motion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[2].className += ' animate-blinds';
        setTimeout(function() {
            ionic.material.motion.blinds();
        }, 500);
    };

    $scope.blinds();
})