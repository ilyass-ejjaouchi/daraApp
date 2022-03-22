app.controller('AdmobCtrl', function($scope, $window) {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        $scope.avail    = true;
        var unit_id     = window.global.Admob_Unit_ID;
        $scope.on       = true;

        if(AdMob){
            AdMob.createBanner({
                adId: unit_id,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                isTesting: true,
                overlap: false,
                offsetTopBar: false
            });
        }else alert('a');

        if(AdMob){
            AdMob.prepareInterstitial({
                adId: unit_id,
                autoShow: true
            });
        }

        $scope.showAdmob = function(){
            if($scope.on){
                $scope.on = false;
                $window.AdMob.hideBanner();         
            }else{
                $scope.on = true;
                $window.AdMob.showBanner(8);            
            }
        }
    }
})
