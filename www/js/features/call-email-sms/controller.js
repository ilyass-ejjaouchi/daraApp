app.controller('CallEmailSmsCtrl', function($scope, $ionicPlatform, $cordovaSms, $cordovaEmailComposer) {
	$scope.sms = function(){
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };
        $ionicPlatform.ready(function(){
            $cordovaSms
              .send('+612345678', 'Dear Ionic Premium support ...', options)
              .then(function() {
                // Success! SMS was sent
              }, function(error) {
                // An error occurred
              });
          });
    };

    $scope.email = function(){
        var body = "Dear Ionic Platform support support ...";
        var email = {
            to: 'info@ionicpremium.com',
            cc: 'ionicpremium@gmail.com',
            bcc: [],
            attachments: [],
            subject: 'Ionic Premium Support',
            body: body,
            isHtml: true
          };

        $cordovaEmailComposer.open(email).then(null, function () {
           // user cancelled email
         });
    };
})
