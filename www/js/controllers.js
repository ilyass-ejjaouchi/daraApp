var app = angular.module('visa.controllers', ['ionic','ngSanitize', 'ionic-datepicker','ionic-timepicker', "ion-datetime-picker",'ngCordova','pdf']);

// This directive use to convert timestamp into time ago format
app.filter('ago', function() {
    return function(date) {
      return moment(date).fromNow();
    };
})

app.filter('trusted', function($sce){
	return function(url){
		return $sce.trustAsResourceUrl(url);
	}
});
app.controller('CompanyCtrl' ,function ($scope,Signature,$cordovaFileTransfer,$cordovaCamera,$ionicModal,$ionicPopup,$state,ionicDatePicker,$filter,$http,ionicTimePicker ,$ionicLoading, $rootScope) {

    console.log('In Company Controller');

});
app.controller('AppCtrl', function($scope,$rootScope, $ionicModal,$translate ,$http, $ionicPopover, $timeout, $ionicSideMenuDelegate, $state, $cordovaOauth, DashList) {

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    window.localStorage.setItem("language",'eng');

    if($rootScope.language == undefined){
        var lang = 'eng';
        $translate.use(lang);
    }

    $scope.demo = 'ios';
    $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
    }

	$scope.productSlides = [
		{id: 1, img: 'img/ecommerce/camera-new.jpg'},
		{id: 2, img: 'img/ecommerce/camera-old.jpg'},
		{id: 3, img: 'img/ecommerce/camera.jpg'}
	];

    $scope.ChangeLanguage = function(lang){

        $rootScope.language = lang;
        window.localStorage.setItem("language", lang);

        $translate.use(lang);
        $rootScope.showPost();
    };

	$scope.mainmenu = DashList.getAllMenu();

	// Active INK Effect
	ionic.material.ink.displayEffect();
})

app.controller('DashListCtrl', function($scope, $stateParams, $ionicModal, $timeout, DashList) {
	$scope.data = DashList.getMenuById($stateParams.id);

    setTimeout(function() {
        ionic.material.motion.ripple();
    }, 500);

    // Active INK Effect
    ionic.material.ink.displayEffect();
});
app.controller('SiteCtrl1',function ($scope,$state,$ionicLoading) {
    console.log('redirecting..');
    $ionicLoading.show({
        template:'Loading...'
    });
    var guard= JSON.parse(window.localStorage.getItem('user'));
    if(guard == null || guard== '' || guard == undefined || guard == [])
    {
        $ionicLoading.hide();
        $state.go('app.login');
    }
    else
    {
        $ionicLoading.hide();
        isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
        if(isCompany)
        {
            $state.go('app.companydash');
        }
        //window.location.reload(true);
        $state.go('app.selectsite');

    }

});
app.controller('Company',function ($scope,$state,$ionicLoading,$http,$rootScope) {
    var guard= JSON.parse(window.localStorage.getItem('user'));
    $ionicLoading.show();
    $http.get($rootScope.domain+'api/company/guards/'+guard.user.user.id)
        .success(function(x){
            $ionicLoading.hide();
            console.log(x);

            $scope.users = x.users;

        })
        .error(function () {
            $ionicLoading.show({
                template:'An Error Occurred',
                duration:'1200'
            });
        });
});
app.controller('CheckCalls',function ($scope,$state,$ionicLoading,$http,$rootScope) {
    var guard= JSON.parse(window.localStorage.getItem('user'));
    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
    $scope.isCompany = isCompany;
    $ionicLoading.show();
    $http.get($rootScope.domain+'api/get/chckcalls/'+guard.user.user.id+'/'+guard.user.user.user_detail.company_id+'/'+isCompany)
        .success(function(x){
            $ionicLoading.hide();
            console.log(x);

            $scope.data = x.check;

        })
        .error(function () {
            $ionicLoading.show({
                template:'An Error Occurred',
                duration:'1200'
            });
        });
    $scope.dateParse = function (date) {
        return Date.parse(date.replace(' ', 'T'))
    };

    $scope.sendCheckCall = function (player_id) {
        if(player_id == 'all')
        {
            window.plugins.OneSignal.getIds(function(ids) {
                console.log(ids);
                var notificationObj = { contents: {en: "Check Call From Company"},
                    included_segments: ["All"],
                    data : {"from" : "Admin"}};
                window.plugins.OneSignal.postNotification(notificationObj,
                    function(successResponse) {
                        console.log("Notification Post Success:", successResponse);
                    },
                    function (failedResponse) {
                        console.log("Notification Post Failed: ", failedResponse);
                        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                    }
                );
            });
        }
        else
        {
            window.plugins.OneSignal.getIds(function(ids) {
                console.log(ids);
                var notificationObj = { contents: {en: "Check Call From Company"},
                    include_player_ids: [player_id],
                    data : {"from" : "Admin"}};
                window.plugins.OneSignal.postNotification(notificationObj,
                    function(successResponse) {
                        console.log("Notification Post Success:", successResponse);
                    },
                    function (failedResponse) {
                        console.log("Notification Post Failed: ", failedResponse);
                        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                    }
                );
            });
        }

    };
});
app.controller('MainCtrl', function($scope,$translate, $cordovaGeolocation, $ionicModal,$sce, $stateParams,$timeout ,$ionicPopup ,$rootScope , $http,$state ,$ionicLoading) {
    /*$scope.$on("$ionicView.beforeEnter", function (event, data) {
        // handle event
        console.log(event);
         console.log("State Params: ", data.stateParams);
    });
    $scope.$on("$ionicView.enter", function(event, data){
        // handle event
        console.log(event);
         console.log("State Params: ", data.stateParams);
    });
    $scope.$on("$ionicView.afterEnter", function(event, data){
        // handle event
        console.log(event);
         console.log("State Params: ", data.stateParams);
    });*/
    $scope.showlan = false;
    $scope.ChangeLanguage = function(lang){
        $translate.use(lang);
    };

    $scope.my_location = '';
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            map: map
        });

        var infoWindow = new google.maps.InfoWindow({
            content: "Here I am!"
        });

        infoWindow.open(map, marker);

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results[0].formatted_address);
                    $scope.my_location  = results[0].formatted_address ;
                } else {
                    console.log('Location not found');
                    $scope.my_location  = results[0].formatted_address ;
                }
            } else {
                element.text('Geocoder failed due to: ' + status);
            }
        });

    }, function(error){
        console.log("Could not get location");
    });

    // Active INK Effect
    ionic.material.ink.displayEffect();

    $scope.show_map = function (map) {
      console.log(this);
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var marker = new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP,
                map: map
            });

            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });

            infoWindow.open(map, marker);

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        console.log(results[0].formatted_address);
                        $scope.my_location  = results[0].formatted_address ;
                    } else {
                        console.log('Location not found');
                        $scope.my_location  = results[0].formatted_address ;
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                    $scope.my_location = 'Geocoder failed due to: ' + status;
                }
            });

        }, function(error){
            console.log("Could not get location");
        });
    };
    $scope.submit_form2 = function (form2) {
      console.log(this);
        var data = {
            other:{
                registration_number:this.registration_number,
                name:this.name,
                phone:this.phone,
                address:this.address,
                insurer:this.insurer,
                date:this.date,
                time:this.time,
                make1:this.make1,
                model:this.model,
                color:this.color,
                passenger:this.passenger,

                email:this.email,
                damage2:this.damage2,
                clarity:this.clarity,
                driver:this.driver,
                say:this.say,
                weather:this.weather,
                factors:this.factors,
                police:this.police,
                reference:this.reference,
                contacts:this.contacts
            },

            form_2:1
        };
        $http.get($rootScope.domain+'submit/',{params:data})
            .success(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Success',
                    template: 'Successfully Submitted Form'
                });
                //$state.go('app.guarddash' ,{reload:true});
            })
            .error(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error while Submitting Form'
                });
            });
    };
    $scope.submit_form1 = function (form1) {
      console.log(this);
        var data = {
            other:{
                email:this.email,
                registration_number:this.registration_number,
                name:this.name,
                phone:this.phone,
                damage:this.damage,
                insurer:this.insurer,
                date:this.date,
                time:this.time,
                make:this.make1,
                what_happen:this.what_happen,
                color:this.color,
                passenger:this.passenger
            },

            form_1:1
        };

        $http.get($rootScope.domain+'submit/',{params:data})
            .success(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Success',
                    template: 'Successfully Submitted Form'
                });
                //$state.go('app.guarddash' ,{reload:true});
            })
            .error(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error while Submitting Form'
                });
            });
    };
    $scope.location_form = function (location) {
      console.log(this);
        var form_data = new FormData();
        form_data.append("email",this.email);
        form_data.append('direction',this.directions);
        form_data.append('road',this.road);
        form_data.append("position",this.my_location);
        form_data.append('location',1);

        var config = {
            headers: {
                'Content-Type': undefined
            }
        };
        $http.post($rootScope.domain+'submit/',form_data,config)
            .success(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Success',
                    template: 'Successfully Submitted Form'
                });
            })
            .error(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error while Submitting Form'
                });
            })
    };
    $scope.reminders = function (reminder) {
      console.log(this);
        var data = {
            other:{
                email:this.email,
                make:this.make1,
                model:this.model,
                test:this.test,
                tax:this.tax,
                insurance:this.insurance
            },

            reminder:1
        };

        $http.get($rootScope.domain+'submit/',{params:data})
            .success(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Success',
                    template: 'Successfully Submitted Form'
                });
                //$state.go('app.guarddash' ,{reload:true});
            })
            .error(function (data) {
                console.log(data);
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error while Submitting Form'
                });
            });
    };
    $rootScope.showPost = function () {

        console.log($stateParams.post);
        if($stateParams.post == undefined)
        {
            $stateParams.post = 250;
        }
        if($rootScope.language == undefined)
        {
            $rootScope.language = 'eng';
        }
        console.log($rootScope.language);
        $ionicLoading.show();
        $http.get($rootScope.domain+'wp-json/wp/v2/pages/'+$stateParams.post)
            .success(function (data) {
                if($stateParams.post == 250)
                {
                    $ionicLoading.hide();
                    console.log(data);

                    $scope.post = data;
                    $scope.postContent = $sce.trustAsHtml(data.content.rendered);
                    $scope.class="class"+$stateParams.post;
                }
                else
                {
                    $ionicLoading.hide();
                    console.log(data);
                    var lang = window.localStorage.getItem("language");
                    if($rootScope.language == undefined && lang == undefined)
                    {
                        $scope.testdata = data.content.rendered.split('{eng}');
                    }
                    else
                    {
                        $scope.testdata = data.content.rendered.split('{'+lang+'}');
                    }

                    // console.log($scope.testdata[1]);
                    $scope.post = data;
                    $scope.postContent = $sce.trustAsHtml($scope.testdata[1]);
                    $scope.class="class"+$stateParams.post;
                }
            })
            .error(function (data) {
                $ionicLoading.hide();
                /*$ionicLoading.show({
                                   template:'An Error Occurred',
                                   duration:'1200'
                               });*/
                console.log(data);
            }).then(function() {
            $timeout(function () {
                var form = angular.element(document.querySelector('form.wpcf7-form'));
                var formAction = form[0].action;
                formAction = formAction.replace('http://localhost:8100/visaapp/',$rootScope.domain);
                form[0].action = formAction;
                console.log(formAction);
            }, 500);

        });
    }
});
app.controller('LogoutCtrl', function($scope, $stateParams , $rootScope , $http,$state ,$cordovaLocalNotification, $ionicHistory,$ionicLoading) {
    window.localStorage.setItem('user' , '');
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $state.go('app.login');
});
app.controller('AuthCtrl', function($scope, $stateParams , $rootScope , $http,$state ,$cordovaLocalNotification, $ionicHistory,$ionicLoading) {

    $scope.doLogIn = function (loginForm) {
        console.log(loginForm.email.$modelValue);
        console.log(loginForm);
        window.plugins.OneSignal.getIds(function(ids) {
            console.log('getIds: ' + JSON.stringify(ids));
            console.log("userId = " + ids.userId + ", pushToken = " + ids.pushToken);

        /*FCMPlugin.getToken(
            function(token){
                console.log(token);*/
                var user = {
                    'email': loginForm.email.$modelValue,
                    'password': loginForm.password.$modelValue,
                    'token':ids.userId
                    /*'token':token*/
                };
                console.log(user);
                $http.post($rootScope.domain+'api/login' , user)
                    .success(function (user) {
                        window.localStorage.setItem('user' , JSON.stringify(user));
                        console.log(user);
                        /*var alarmTime = new Date();
                         alarmTime.setMinutes(alarmTime.getMinutes() + 1);*/

                        console.log(user.user.checkcall.call_time_intervel+' call intervel');
                        /*$cordovaLocalNotification.schedule({
                            id: "12345",
                            text: 'Check this call to mark your presence ',
                            icon: 'res://icon',
                            color: 'FF0000',
                            smallIcon: 'res://cordova',
                            every:user.user.checkcall.call_time_intervel,
                            sound: 'file://sound/ding.mp3',
                            title: "Check Call Notification"
                        }).then(function () {
                            console.log("The notification has been set");
                        });*/

                        $state.go('app.selectsite1');
                    })
                    .error(function (error) {
                        $scope.error = error.error.message;
                        $ionicLoading.show({
                            template:'An Error Occurred',
                            duration:'1200'
                        });
                        console.log(error.error.message);
                    })

            },
            function(err){
                $ionicLoading.show({
                    template:'An Error Occurred',
                    duration:'1200'
                });
                console.log('error retrieving token: ' + err);
            }
        );
         /*var user = {
         'email': loginForm.email.$modelValue,
         'password': loginForm.password.$modelValue,
         //'token':ids.userId
         /!*'token':token*!/
         };
         console.log(user);
         $http.post($rootScope.domain+'api/login' , user)
         .success(function (user) {
         window.localStorage.setItem('user' , JSON.stringify(user));
         console.log(user);
         /!*var alarmTime = new Date();
         alarmTime.setMinutes(alarmTime.getMinutes() + 1);*!/

         console.log(user.user.checkcall.call_time_intervel+' call intervel');
         /!*$cordovaLocalNotification.schedule({
         id: "12345",
         text: 'Check this call to mark your presence ',
         icon: 'res://icon',
         color: 'FF0000',
         smallIcon: 'res://cordova',
         every:user.user.checkcall.call_time_intervel,
         sound: 'file://sound/ding.mp3',
         title: "Check Call Notification"
         }).then(function () {
         console.log("The notification has been set");
         });*!/

         $state.go('app.selectsite1');
         })
         .error(function (error) {
         $scope.error = error.error.message;
         $ionicLoading.show({
         template:'An Error Occurred',
         duration:'1200'
         });
         console.log(error.error.message);
         })*/

    };

    $scope.logout = function () {
        window.localStorage.setItem('user' , '');
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go('app.login');

    }
});
app.controller('GuardCtrl', function($scope, $stateParams , $rootScope , $http,$state) {
    //$rootScope.$emit("loaddashboard", {});

    console.log('loadind DashBoard');
    /*var guard= JSON.parse(window.localStorage.getItem('user'));
    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
    if(isCompany)
    {
        $state.go('app.companydash');
    }*/
    /*if(window.localStorage.getItem('dummy') == 1 || window.localStorage.getItem('dummy') == '1')
    {
        //$state.go($state.current, {}, {reload: true});
        window.location.reload();
        window.localStorage.setItem('dummy','12');
    }*/
    $scope.showlan = true;
});
app.controller('SignatureCtrl',function ($scope, $stateParams, $state , $timeout,Signature) {

    console.log('loading canvas');
    var canvas = document.getElementById('signatureCanvas');
    $scope.signaturePad = new SignaturePad(canvas);


    $scope.clearCanvas = function() {
        $scope.signaturePad.clear();
    };

    $scope.saveCanvas = function() {
        var sigImg = $scope.signaturePad.toDataURL();

        Signature.saveImage(sigImg);console.log(sigImg);
        $scope.signature = sigImg;
        console.log($stateParams.backTo);
        setTimeout(function() {
            $state.go($stateParams.backTo);
        }, 500);



    };

});
app.controller('SiteCtrl', function($scope,Signature, $stateParams,$ionicPopup,$sce,$cordovaGeolocation ,$ionicModal, $rootScope ,$ionicHistory, $http , $state ,$ionicLoading) {

    $scope.closeApp = function() {
        console.log('Closing App');
        ionic.Platform.exitApp();
    };
console.log(window.localStorage.getItem('user'));
    if (window.localStorage.getItem('user') != '' && JSON.parse(window.localStorage.getItem('user')) != "" && window.localStorage.getItem('user') != null) {
        var guard= JSON.parse(window.localStorage.getItem('user'));
        console.log(guard);
        if(guard.user.user.user_detail.role_id != 3)
        {

        $scope.signature = Signature.getImage();
        console.log($scope.signature);
        $scope.dateParse = function (date) {
            return Date.parse(date.replace(' ', 'T'))
        };



        function deg2rad(x) {
            return x*0.0174533;
        }
        function rad2deg(x) {
            return x*57.2958;
        }

         $scope.calDistance = function( lat2, lon2) {
             var options = {timeout: 1000, enableHighAccuracy: true};
             $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
                 console.log(position);
                 var lat1 = position.coords.latitude;
                 var lon1 = position.coords.longitude;
                 console.log(lat1);
                 console.log(lon1);
                 console.log(lat2);
                 console.log(lon2);
             // convert from degrees to radians
             lat1 = deg2rad(lat1);
             lon1 = deg2rad(lon1);
             lat2 = deg2rad(lat2);
             lon2 = deg2rad(lon2);

             var latDelta = lat2 - lat1;
             var lonDelta = lon2 - lon1;
            var earthRadius = 3959;
             var angle = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latDelta / 2), 2) +
                     Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lonDelta / 2), 2)));
console.log(angle * earthRadius);
             return angle * earthRadius;
             });
        };



        $ionicLoading.show();
        userId = guard.user.user.id;
        companyId = guard.user.user.user_detail.company_id;
        $http.get($rootScope.domain+'api/weeklyrota/'+userId + '/'+companyId)
            .success(function(x){
                $ionicLoading.hide();
                console.log(x.guard);
            /*    x.guard.forEach(function (a) {
                    window.setTimeout(function () {
                        a.distance =  $scope.calDistance(a.guardSiteDetail.latitude,a.guardSiteDetail.logitude);
                        console.log(a);

                    },1000)

                });*/
                window.localStorage.setItem('guardDetail',JSON.stringify(x.guard));
                $scope.data = x.guard;

            })
            .error(function (data) {
                console.log(data);
                $scope.error = data.error.message;
                $ionicLoading.show({
                    template:'An Error Occurred',
                    duration:'1200'
                });
            });
        $scope.guardDash = function (siteid , shiftid) {

            window.localStorage.setItem('user_site_id' , siteid);
            window.localStorage.setItem('user_shift_id' ,shiftid);
            $state.go('app.guarddash');
        };
        /*$ionicModal.fromTemplateUrl('templates/assignment-instructions/instructions.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal1 = modal;
        });*/
        $scope.assiDetail = function () {

            $scope.scroll = document.getElementsByClassName('scroll');

            var siteid = window.localStorage.getItem('user_site_id');
            data = JSON.parse(window.localStorage.getItem('guardDetail'));

            data.forEach(function (assi) {
                console.log(siteid);
                if(assi.guardSiteDetail.id == siteid)
                {
                    $scope.detail = assi;
                    $scope.date = new Date();
                }

            });

            /*$scope.modal1.show();*/
        };
        $scope.closeModal1 =function () {
            $scope.modal1.hide();
        };
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        $scope.instructionsConfirm = function (frm , id) {

            $ionicLoading.show();
            var data = {
                signature:Signature.getImage(),
                guard_id:guard.user.user.id,
                site_id:id
            };
            console.log(data);
            $http.post($rootScope.domain+'api/instructions/confirm',data)
                .success(function (data) {
                    $ionicLoading.hide();
                    console.log(data);
                     $ionicPopup.alert({
                        title: 'Success',
                        template: 'Instructions Successfuly Confirmed'
                    });
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');
                })
                .error(function (data) {
                    $ionicLoading.show({
                        template:'An Error Occurred',
                        duration:'1200'
                    });
                    window.localStorage.setItem('dummy','1');
                    console.log(data);
                })
        };
        $scope.risksDetail = function () {

            var siteid = window.localStorage.getItem('user_site_id');
            data = JSON.parse(window.localStorage.getItem('guardDetail'));
            data.forEach(function (risk) {
                if(risk.guardSiteDetail.id == siteid)
                {
                    $scope.detail = risk;
                    $scope.date = new Date();
                }

            });
        };
        $scope.closeModal =function () {
            $scope.modal.hide();
        };
        $scope.riskConfirm = function (frm,id) {
            $ionicLoading.show();

            var data = {
                signature:Signature.getImage(),
                guard_id:guard.user.user.id,
                site_id:id
            };
            $http.post($rootScope.domain+'api/risk/confirm',data)
                .success(function (data) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Success',
                        template: 'Risk Confirmed Successfully'
                    });
                    console.log(data);

                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');

                })
                .error(function (data) {
                    $ionicLoading.show({
                        template:'An Error Occurred',
                        duration:'1200'
                    });
                    window.localStorage.setItem('dummy','1');
                    console.log(data);
                })
        };
        $scope.openingClosingCheck = function (checks) {
            var siteid = window.localStorage.getItem('user_site_id');
            if(this.why)
            {
                data = {
                    'guard_id': guard.user.user.id,
                    'company_id': guard.user.user.user_detail.company_id,
                    'site_id': siteid,
                    'toilet_check' : this.toilet_check?1:0,
                    'going_to' : this.going_to,
                    'fire_exits_clear':this.fire_exits_clear?1:0,
                    'no_hazards':this.no_hazards?1:0,
                    'reason':this.reason
                }
            }
            else {
                data = {
                    'guard_id': guard.user.user.id,
                    'company_id': guard.user.user.user_detail.company_id,
                    'site_id': siteid,
                    'going_to' : this.going_to,
                    'toilet_check' : this.toilet_check,
                    'fire_exits_clear':this.fire_exits_clear,
                    'no_hazards':this.no_hazards
                }
            }

            console.log(data);
            $ionicLoading.show();
            console.log($stateParams);
            $http.post($rootScope.domain+'api/opening/closing/checks',data)
                .success(function (data) {
                    $ionicLoading.hide();
                    $state.go('app.guarddash');
                    console.log(data);
                })
                .error(function (data) {
                    $ionicLoading.show({
                        template:'An Error Occurred',
                        duration:'1200'
                    });
                    console.log(data);
                })
        };


        }
        else
        {
            console.log('i am a company');
            //$state.go('app.login');
            $state.go('app.companydash');
        }

    }
    else
    {
        $state.go('app.login');
    }


});
app.controller('DailyOccurrence' , function ($state,$scope,$http,$rootScope,$ionicLoading,ionicTimePicker, $stateParams) {


    $scope.dateParse = function (date) {
        return Date.parse(date.replace(' ', 'T'))
    }
    var guard= JSON.parse(window.localStorage.getItem('user'));
    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
    $scope.isCompany = isCompany;
    var siteid = window.localStorage.getItem('user_site_id');
    $scope.getitems = function () {
        $ionicLoading.show();
        $http.get($rootScope.domain+'api/daily/occurrence/'+guard.user.user.id+'/'+siteid+'/'+ guard.user.user.user_detail.company_id+'/'+isCompany)
            .success(function (data) {
                $ionicLoading.hide();
                $scope.mydata = data.data;
                console.log(data);
            })
            .error(function (data) {
                $ionicLoading.show({
                    template:'An Error Occurred',
                    duration:'1200'
                });
                console.log(data);
            })
    };
    $scope.getitems();

   /* $scope.mydata.push({
        description: 'Post Man comes and drops off a parcel for Office 29',
        time: new Date()
    });*/
    // Add a Item to the list
    $scope.addItem = function (item) {
        $ionicLoading.show({
            template:'Adding Record'
        });
        var data ={
            'guard_id':guard.user.user.id,
            'company_id':guard.user.user.user_detail.company_id,
            'site_id': siteid,
            'discription':this.discription,
            'is_active':1,
            'time' : $scope.time
        };
        console.log(data);
        $http.post($rootScope.domain+'api/daily/occurrence',data)
            .success(function (data) {
                $scope.getitems();
                $ionicLoading.hide();
                console.log(data);
                $scope.data = data.data;
            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template:'An Error Occurred',
                    duration:'1200'
                });
            });

        // Clear input fields after push
        this.discription = "";
        this.newEntry = false;
    };

    var eventTime = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                console.log(new Date(val * 1000));
                var selectedTime = new Date(val * 1000);
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                //show time with am pm

                var hours = selectedTime.getUTCHours();
                var minutes = selectedTime.getUTCMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                $scope.eventTime = hours + ':' + minutes + ' ' + ampm;
                $scope.time = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00.000000';
                console.log($scope.time);
            }
        }
    };
    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(eventTime);
    };
})
app.controller('TallyCtrl',function ($state,$ionicModal,$stateParams,$scope,$http,$rootScope,$ionicLoading) {
    $ionicLoading.show();
    $scope.timeValue = new Date();
    var guard = JSON.parse(window.localStorage.getItem('user'));
    console.log(guard);
    $http.get($rootScope.domain+'api/tally/counter/'+guard.user.user.id+'/'+parseInt(window.localStorage.getItem('user_site_id'))+'/'+guard.user.user.user_detail.company_id)
        .success(function (tallyCounter) {
            $scope.tallyCounter = tallyCounter.tallyCounter;
            $ionicLoading.hide();
            console.log(tallyCounter);
        })
        .error(function (data) {
            $scope.error = data.error.message;
            $ionicLoading.show({
                template:'An Error Occurred',
                duration:'1200'
            });
            console.log(data);
        });
    $scope.addVisitor = function (frm) {
        $ionicLoading.show({
            template:'Adding Record...'
        });
        var data ={
            "guard_id":guard.user.user.id,
            "site_id":parseInt(window.localStorage.getItem('user_site_id')),
            "name":this.name,
            "discription":this.description,
            "status":parseInt($stateParams.count) + 1

        };
        console.log(data);
        $http.post($rootScope.domain+'api/visitors/log/'+$scope.timeValue,data)
            .success(function (data) {
                $scope.count = parseInt($stateParams.count) + 1;
                $ionicLoading.hide();
                $state.go('app.tallyCounter' , {count:$scope.count});
                console.log(data);
            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template:'An Error Occurred',
                    duration:'1200'
                });
            });
        this.description='';
        this.name='';
    };

    $ionicModal.fromTemplateUrl('templates/events/visitorOut.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeModal =function () {
        $scope.modal.hide();
    };
    $scope.count = parseInt($stateParams.count);
    $scope.countDown = function () {
        $ionicLoading.show();
        console.log('down');

        $http.get($rootScope.domain+'api/get/visitors/log/'+guard.user.user.id+'/'+parseInt(window.localStorage.getItem('user_site_id')))
            .success(function (data) {
                console.log(data);
                $scope.data = data.visitors;
                $ionicLoading.hide();
                $scope.count = $scope.count - 1;
                $scope.modal.show();
            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template:'An Error Occured!',
                    duration:'1000'
                })
            })

    };
    $scope.visitorOut =function (id) {
        $ionicLoading.show({
            template:'Visitor Out'
        });
        a = new Date();
        $http.get($rootScope.domain+'api/update/visitors/log/'+id+'/'+a)
            .success(function (data) {
                console.log(data);
                $ionicLoading.hide();
            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template:'An Error Occured!',
                    duration:'1000'
                })
            })

    };
    $scope.countUp = function () {
        $state.go('app.visitorLog',{count:$scope.count});
        console.log('up');


    };

});

app.controller('CameraCtrl', function($scope,$ionicPopup,$http,$cordovaGeolocation, $ionicActionSheet,$ionicLoading,$rootScope,$stateParams, $cordovaCamera, $cordovaImagePicker, $cordovaFile, $state , $cordovaFileTransfer) {
    console.log(parseInt(window.localStorage.getItem('user_shift_id')));
    $scope.date = new Date();
    $scope.images = [];
    var guard = JSON.parse(window.localStorage.getItem('user'));
console.log('in camera controller');
    $scope.showAlert = function(title, msg) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    };
    $scope.checkOut = function () {
        $ionicLoading.show();

        var url = $rootScope.domain+"api/attendance";





        var params = {};
        params.guard_id = guard.user.user.id;
        params.company_id = guard.user.user.user_detail.company_id;
        params.check = 2;

        params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
        params.shift_id =parseInt(window.localStorage.getItem('user_shift_id'));
        params.comment = 'Check Out Attendance';
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            params.location = position.coords.latitude+ "," +position.coords.longitude;


            $http.post(url, params)
                .then(function(result) {
                    console.log(result);
                    $ionicLoading.hide();
                    $scope.showAlert('Success', 'you have finished your shift');
                    window.localStorage.setItem('user','');
                    $state.go('app.login');
                }, function(error){
                    $ionicLoading.show({
                        template:'Please Try Again',
                        duration:'1000'
                    });
                    console.log(error);
                    console.log("Could not upload Image");
                });

        },function (error) {
            params.location = 'Not Avalible';


            $http.post(url, params)
            .then(function(result) {
                console.log(result);
                $ionicLoading.hide();
                $scope.showAlert('Success', 'you have finished your shift');
                window.localStorage.setItem('user','');
                $state.go('app.login');
            }, function(error){
                $ionicLoading.show({
                    template:'Please Try Again',
                    duration:'1000'
                });
                console.log(error);
                console.log("Could not upload Image");
            });
        });
    };
  $scope.takePic = function() {

    var options = {
     destinationType: Camera.DestinationType.FILE_URI,
     sourceType: Camera.PictureSourceType.CAMERA,
     targetWidth: 800,
     targetHeight: 400,
     quality: 100
     };

     $cordovaCamera.getPicture(options).then(function(imageUrl) {
         console.log(imageUrl);
         $scope.images.push(imageUrl);


             $ionicLoading.show();
             // Destination URL
             // var url = "http://localhost:8888/upload.php";
             //var url = "https://devdactic.com/downloads/upload.php";
             //var url = "http://takeawaymobileapplication.uk/clients/ezf/server/upload.php";
             var url = $rootScope.domain+"api/attendance";

             // File for Upload
             var targetPath = imageUrl;

             // File name only
             var filename = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);

             var options = {
                 fileKey: "file",
                 fileName: filename,
                 chunkedMode: false,
                 mimeType: "multipart/form-data"
             };

             var params = {};
             params.fileName = filename;
             params.guard_id = guard.user.user.id;
             params.company_id = guard.user.user.user_detail.company_id;
             params.check = 1;

             params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
             params.shift_id =parseInt(window.localStorage.getItem('user_shift_id'));
             params.comment = 'Attendance';
         console.log(parseInt(window.localStorage.getItem('user_site_id')));
         var locationOptions = {timeout: 10000, enableHighAccuracy: true};
         $cordovaGeolocation.getCurrentPosition(locationOptions).then(function(position){
             params.location = position.coords.latitude+ "," +position.coords.longitude;

             options.params = params;
             console.log(options.params);
             $cordovaFileTransfer.upload(url, targetPath, options)
                 .then(function(result) {
                     console.log(result);
                     $ionicLoading.hide();
                     $scope.showAlert('Success', 'you have Started your shift');
                 }, function(error){
                     $ionicLoading.show({
                         template:'Please Try Again',
                         duration:'1000'
                     });
                     console.log(error);
                     console.log("Could not upload Image");
                 });

         },function (error) {
             params.location = 'Not Avalible';
             options.params = params;
             console.log(options.params);
             $cordovaFileTransfer.upload(url, targetPath, options)
                 .then(function(result) {
                     console.log(result);
                     $ionicLoading.hide();
                     $scope.showAlert('Success', 'Thank You.');
                 }, function(error){
                     $ionicLoading.show({
                         template:'Please Try Again',
                         duration:'1000'
                     });
                     console.log(error);
                     console.log("Could not upload Image");
                 });
         });




            /* var ft = new FileTransfer();
             ft.upload(imageUrl, encodeURI($rootScope.domain+"api/attendance"), win, fail, options2);*/


     });



    $state.go('app.guarddash');
  };

  // Active INK Effect
  ionic.material.ink.displayEffect();
});

app.controller('GuardRotaLocationCtrl', function($scope, $cordovaGeolocation,$ionicLoading, $ionicModal, $timeout) {
  var options = {timeout: 10000, enableHighAccuracy: true};
    $ionicLoading.show();
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("rota-map"), mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: map
    });
    $ionicLoading.hide();
    var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
    });

    infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });

  }, function(error){
      $ionicLoading.show({
          'template':'Could not get location',
          'duration':'1400'
      })
    console.log("Could not get location");
  });

  // Active INK Effect
  ionic.material.ink.displayEffect();

});
app.controller('PatrolCtrl',function ($scope,$state,$http,$ionicLoading,$rootScope,$cordovaGeolocation) {
    var latitudes = [];
    var longitudes = [];
    $scope.start = 0;
    var guard = JSON.parse(window.localStorage.getItem('user'));


    $scope.startPatrol = function () {
        $scope.start = 1;
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            latitudes.push(position.coords.latitude);
            longitudes.push(position.coords.longitude);
            var data = {
                'guard_id': guard.user.user.id,
                'site_id': parseInt(window.localStorage.getItem('user_site_id')),
                'latitude':position.coords.latitude,
                'longitude':position.coords.longitude,
                'company_id':guard.user.user.user_detail.company_id,
                'shift_id':parseInt(window.localStorage.getItem('user_shift_id'))
            };
            $http.post($rootScope.domain+'/api/patrol/start', data)
                .success(function (data) {
                    $scope.patrol = data.patrol;
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                })
        });


        $scope.myVar = setInterval(function(){

            $cordovaGeolocation.getCurrentPosition(options).then(function(position){


                latitudes.push(position.coords.latitude);
                longitudes.push(position.coords.longitude);
                var data = {
                    'latitudes':latitudes.toString(),
                    'longitudes':longitudes.toString()
                };
                console.log(data);
                $http.post($rootScope.domain+'/api/patrol/Update/'+$scope.patrol.id, data)
                    .success(function (data) {
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log(data);
                    })
            });
        }, 10000);
    };
    $scope.stopPatrol = function () {
        $scope.start = 0;
        clearInterval($scope.myVar);
        $state.go('app.patrol-notification', {latitudes:latitudes,longitudes:longitudes});
    }
});
app.controller('RouteMakerCtrl',function ($scope,$state,$http,$ionicLoading,$rootScope,$stateParams,$cordovaGeolocation) {
console.log($stateParams.latitudes.split(","));
console.log($stateParams.longitudes);
    var latitudes = $stateParams.latitudes.split(",");
    var longitudes = $stateParams.longitudes.split(",");

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;


        $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: $scope.latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        directionsDisplay.setMap($scope.map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);

    }, function(error){
        $ionicLoading.show({
            template:"Could not get location",
            duration:'1200'
        });
        $state.go('app.guarddash');
        console.log("Could not get location");
    });
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
        var myarray = ['30.808500, 73.459396','33.768051, 72.360703','33.351357, 72.774734'];

       /* for (var i = 0; i < myarray.length; i++) {
            if (myarray[i]) {
                console.log(myarray[i]);
                waypts.push({
                    location: myarray[i],
                    stopover: true
                });
            }
        }
*/
        for (var i = 0; i < latitudes.length; i++) {
            if (latitudes[i]) {
                waypts.push({
                    location: latitudes[i]+','+longitudes[i],
                    stopover: true
                });
            }
        }
        directionsService.route({
            origin: latitudes[0]+','+longitudes[0],
            destination: latitudes[latitudes.length-1]+','+longitudes[longitudes.length-1],
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'WALKING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

});
app.controller('CheckCallCtrl', function($scope, $cordovaDialogs) {
  $scope.showCheckCallSuccess = function(){
    $cordovaDialogs.alert('Check call successfully made', 'Check Call!', 'OK').then(function(){})
  }
});

app.controller('NewslettersCtrl', function($scope , $rootScope,$ionicLoading,$ionicModal, $http) {
    var guard = JSON.parse(window.localStorage.getItem('user'));
    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
    $scope.isCompany = isCompany;

    $ionicLoading.show();

    $http.get($rootScope.domain+'api/newsletters/'+guard.user.user.id +'/'+guard.user.user.user_detail.company_id+'/'+isCompany)
    .success(function (data) {
        $scope.data = data.newsLetter;
        $ionicLoading.hide();
        console.log(data.newsLetter);

    })
    .error(function (data) {
        console.log(data);
        $ionicLoading.show({
            template :'An error occurred',
            duration: '1200'
        });


    });
    $ionicModal.fromTemplateUrl('templates/newsletters/newsletter-single.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.newsDetail = function (id) {
        $scope.data.forEach(function (news) {

            if(news.id == id.id)
            {
                $scope.detail = news;
            }

        });

        $scope.modal.show();
    };
    $scope.closeModal =function () {
        $scope.modal.hide();
    }

    /*setTimeout(function() {
        ionic.material.motion.fadeSlideInRight();
    }, 500);
    // Active INK Effect
    ionic.material.ink.displayEffect();
*/
});
app.controller('MessageCtrl' ,function ($scope ,$http ,$ionicLoading,$ionicScrollDelegate, $rootScope) {
    var guard = JSON.parse(window.localStorage.getItem('user'));
    console.log(guard);
    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
    $scope.isCompany = isCompany;
    $rootScope.$on("loaddashboard", function(){
        $scope.getMessages();
    });
    $scope.getMessages = function () {
        $ionicLoading.show();

        $http.get($rootScope.domain+'api/messages/'+guard.user.user.id+'/'+guard.user.user.user_detail.company_id+'/'+isCompany)
            .success(function (data) {
                $ionicLoading.hide();
                console.log(data);
                $scope.companyName = data[0];
                $scope.data = data[1];


                $ionicScrollDelegate.scrollBottom(true);

            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template :'An error occurred',
                    duration: '1200'
                });
            })
    };
    $scope.getMessages();
    $scope.sendMessage = function (message) {
        $ionicLoading.show();
        var data = {
            'guard_id':guard.user.user.id,
            'company_id': guard.user.user.user_detail.company_id,
            'message':message,
            'type':2
        };
        $http.post($rootScope.domain+'api/send/message',data)
            .success(function (data) {
                console.log(data);
                $scope.getMessages();
                $ionicLoading.show({
                    template :'Message Successfully Sent',
                    duration: '2000'
                });
                $scope.message = '';
            })
            .error(function (data) {
                console.log(data);
                $ionicLoading.show({
                    template :'An Error Occurred',
                    duration: '2000'
                });
            })
    }
})
app.controller('HolidayCtrl' ,function ($scope,ionicDatePicker,$filter,$state,$http,ionicTimePicker,$ionicLoading , $rootScope) {
    $rootScope.endDate = new Date();
    $rootScope.startDate = new Date();

    $scope.requestHoliday = function (frm) {
        console.log(this.startDate);
        console.log(this.endDate);
        $ionicLoading.show({
            template :'Submitting Holiday Request'
        }
        );
        var guard = JSON.parse(window.localStorage.getItem('user'));
        var data = {
            'guard_id': guard.user.user.id,
            'company_id': guard.user.user.user_detail.company_id,
            'site_id': parseInt(window.localStorage.getItem('user_site_id')),
            'start_date': this.startDate,
            'end_date': this.endDate
        };

        $http.post($rootScope.domain+'api/holiday/request' , data )
            .success(function (data) {
                $ionicLoading.hide();
                console.log(data);
                $state.go('app.guarddash');
            })
            .error(function (data) {
                $ionicLoading.show({
                    template :'An error occured',
                    duration: 1200
                });
                console.log(data);
            })
    }

});

app.controller('IncidentCtrl' ,function ($scope,Signature,$cordovaFileTransfer,$cordovaCamera,$ionicModal,$ionicPopup,$state,ionicDatePicker,$filter,$http,ionicTimePicker ,$ionicLoading, $rootScope) {

$scope.signature = Signature.getImage();
    $scope.incidentDate = $filter('date')(new Date, 'dd-MM-yyyy');
    var datepicker = {
        callback: function (date) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + date, new Date(date));
            $scope.incidentDate = $filter('date')(date, 'dd-MM-yyyy');

        }
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(datepicker);
    };

    var incidentTime = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                console.log(new Date(val * 1000));
                var selectedTime = new Date(val * 1000);
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                //show time with am pm

                var hours = selectedTime.getUTCHours();
                var minutes = selectedTime.getUTCMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                $scope.incidentTime = hours + ':' + minutes + ' ' + ampm;
                $scope.time = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00.000000';
                console.log($scope.time);
            }
        }
    };
    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(incidentTime);
    };
    $scope.uploadImage = function() {

        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 800,
            targetHeight: 400,
            quality: 100
        };

        $cordovaCamera.getPicture(options).then(function(imageUrl) {
            console.log(imageUrl);
            $scope.image =imageUrl;
            /* var ft = new FileTransfer();
             ft.upload(imageUrl, encodeURI($rootScope.domain+"api/attendance"), win, fail, options2);*/

        });

    };
    $scope.submitIncident = function (frm) {
        var guard = JSON.parse(window.localStorage.getItem('user'));
        console.log('in incident ctrl');
        $ionicLoading.show();
        // Destination URL
        // var url = "http://localhost:8888/upload.php";
        //var url = "https://devdactic.com/downloads/upload.php";
        //var url = "http://takeawaymobileapplication.uk/clients/ezf/server/upload.php";
        var url = $rootScope.domain+"api/incidents/accidents";

        // File for Upload
        var targetPath = $scope.image;

        if(targetPath != '' && targetPath !=null)
        {
            // File name only
            var filename = $scope.image.substr($scope.image.lastIndexOf('/') + 1);

            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data"
            };

            var params = {};
            params.fileName = filename;
            params.guard_id = guard.user.user.id;
            params.company_id = guard.user.user.user_detail.company_id;
            params.type = 1;
            params.hasImage = 1;
            params.signature = Signature.getImage();
            params.description = this.incidentDescription;
            params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
            params.time = $scope.time;

            options.params = params;

            $cordovaFileTransfer.upload(url, targetPath, options)
                .then(function(result) {
                    console.log(result);
                    $ionicLoading.hide();
                    $scope.showAlert('Success', 'Incident Submitted.');
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');
                }, function(error){
                    $ionicLoading.hide();
                    console.log(error);
                    console.log("Could not submit Incident");
                    window.localStorage.setItem('dummy','1');
                    $scope.showAlert('Error', 'Could not Submit Incident.');
                });

        }
        else {
            var params = {};
            params.guard_id = guard.user.user.id;
            params.company_id = guard.user.user.user_detail.company_id;
            params.type = 1;
            params.hasImage = 0;
            params.description = this.incidentDescription;
            params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
            params.time = $scope.time;
            params.file = 0;
            params.signature = Signature.getImage();
            $http.post(url,params)
                .success(function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('Success', 'Incident Submitted.');


                    console.log(data);
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');
                })
                .error(function (data) {
                    console.log(data);
                    $ionicLoading.hide();
                    $scope.showAlert('Error', 'Could not Submit Incident.');
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');

                })
        }
        $scope.showAlert = function(title, msg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: msg
            });
        };
    }
});
app.controller('AccidentCtrl' ,function ($scope,Signature,$cordovaFileTransfer,$ionicModal,$cordovaCamera,$ionicPopup,$state,ionicDatePicker,$filter,$http,ionicTimePicker ,$ionicLoading, $rootScope) {
    $scope.signature = Signature.getImage();
    $scope.accidentDate = $filter('date')(new Date, 'dd-MM-yyyy');
    var datepicker = {
        callback: function (date) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + date, new Date(date));
            $scope.accidentDate = $filter('date')(date, 'dd-MM-yyyy');

        }
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(datepicker);
    };

    var accidentTime = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                console.log(new Date(val * 1000));
                var selectedTime = new Date(val * 1000);
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                //show time with am pm

                var hours = selectedTime.getUTCHours();
                var minutes = selectedTime.getUTCMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                $scope.accidentTime = hours + ':' + minutes + ' ' + ampm;
                $scope.time = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00.000000';
                console.log($scope.time);
            }
        }
    };
    $scope.openTimePicker = function() {
        ionicTimePicker.openTimePicker(accidentTime);
    };
    $scope.uploadImage = function() {

        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 800,
            targetHeight: 400,
            quality: 100
        };

        $cordovaCamera.getPicture(options).then(function(imageUrl) {
            console.log(imageUrl);
            $scope.image =imageUrl;
            /* var ft = new FileTransfer();
             ft.upload(imageUrl, encodeURI($rootScope.domain+"api/attendance"), win, fail, options2);*/

        });

    };
    $scope.submitAccident = function (frm) {
        var guard = JSON.parse(window.localStorage.getItem('user'));
        console.log('in accident ctrl');
        $ionicLoading.show();
        // Destination URL
        // var url = "http://localhost:8888/upload.php";
        //var url = "https://devdactic.com/downloads/upload.php";
        //var url = "http://takeawaymobileapplication.uk/clients/ezf/server/upload.php";
        var url = $rootScope.domain+"api/incidents/accidents";

        // File for Upload
        var targetPath = $scope.image;
        if(targetPath != '' && targetPath !=null)
        {
        // File name only
        var filename = $scope.image.substr($scope.image.lastIndexOf('/') + 1);

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data"
        };

        var params = {};
        params.fileName = filename;
        params.guard_id = guard.user.user.id;
        params.company_id = guard.user.user.user_detail.company_id;
        params.type = 2;
            params.hasImage = 1;
        params.description = this.accidentDescription;
        params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
        params.time = $scope.time;
        params.signature = Signature.getImage();
        options.params = params;

        $cordovaFileTransfer.upload(url, targetPath, options)
            .then(function(result) {
                console.log(result.response);
                $ionicLoading.hide();
                $scope.showAlert('Scccess', 'Successfully Submited Accident.');
                window.localStorage.setItem('dummy','1');
                $state.go('app.guarddash');
                /*var url2 = $rootScope.domain+"api/incidents/accidents/update/"+result.response;

                // File for Upload
                var targetPath2 = $scope.signature;

                // File name only
                var filename2 = $scope.signature.substr($scope.image.lastIndexOf('/') + 1);
                var options2 = {
                    fileKey: "file",
                    fileName: filename2,
                    chunkedMode: false,
                    mimeType: "multipart/form-data"
                };
                var params = {};
                params.fileName = filename2;
                params.guard_id = guard.user.user.id;
                options.params = params;

                $cordovaFileTransfer.upload(url2, targetPath2, options2)
                    .then(function(result) {

                        console.log(result);
                        $ionicLoading.hide();
                        $scope.showAlert('Success', 'Accident Submitted.');
                        $state.go('app.guarddash');
                    }, function(error){
                        $ionicLoading.hide();
                        console.log(error);
                        console.log("Could not submit Accident");
                        $scope.showAlert('Error', 'Could not Submit Accident.');
                    });*/
            }, function(error){
                $ionicLoading.hide();
                console.log(error);
                console.log("Could not submit Accident");
                $scope.showAlert('Error', 'Could not Submit Accident.');
                window.localStorage.setItem('dummy','1');
                $state.go('app.guarddash');
            });

        }
        else {
            var params = {};
            params.guard_id = guard.user.user.id;
            params.company_id = guard.user.user.user_detail.company_id;
            params.type = 1;
            params.description = this.accidentDescription;
            params.site_id = parseInt(window.localStorage.getItem('user_site_id'));
            params.time = $scope.time;
            params.signature = Signature.getImage();
            params.file = 0;
            $http.post(url,params)
                .success(function (data) {
                    console.log(data);
                    $ionicLoading.hide();
                    $scope.showAlert('Success', 'Accident Submitted.');
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');
                })
                .error(function (data) {
                    $scope.showAlert('Error', 'Could not Submit Accident.');
                    $ionicLoading.hide();
                    console.log(data);
                    window.localStorage.setItem('dummy','1');
                    $state.go('app.guarddash');

                })
        }
        $scope.showAlert = function(title, msg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: msg
            });
        };
    }
});
app.controller('CustomerIdCtrl', function($scope, $http,$ionicPopup, $ionicLoading,$cordovaCamera ,$cordovaFileTransfer,$rootScope) {
    $scope.images = [];
    var guard = JSON.parse(window.localStorage.getItem('user'));
    console.log('in camera controller');
    $scope.takePic = function() {

        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 800,
            targetHeight: 400,
            quality: 100
        };

        $cordovaCamera.getPicture(options).then(function(imageUrl) {
            console.log(imageUrl);
            $scope.images.push(imageUrl);

            $ionicLoading.show();

            //var url = "http://takeawaymobileapplication.uk/clients/ezf/server/upload.php";
            var url = $rootScope.domain+"api/customer/picture";

            // File for Upload
            var targetPath = imageUrl;

            // File name only
            var filename = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);

            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data"
            };

            var params = {};
            params.fileName= filename;
            params.guard_id = guard.user.user.id;
            params.company_id = guard.user.user.user_detail.company_id;
            params.site_id = parseInt(window.localStorage.getItem('user_site_id'));

            options.params = params;
            console.log(options);

            $cordovaFileTransfer.upload(url, targetPath, options)
                .then(function(result) {
                    console.log(result);
                    $ionicLoading.hide();
                    $scope.showAlert('Success', 'ID Image upload finished.');
                }, function(error){
                    $ionicLoading.hide();
                    console.log(error);
                    console.log("Could not upload Image");
                });


            $scope.showAlert = function(title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
            };





               /* var ft = new FileTransfer();
                ft.upload(imageUrl, encodeURI($rootScope.domain+"api/customer/picture"), win, fail, options2);
*/
        });



        //$state.go('app.guarddash');
    };

});
app.controller('MyInfiniteCtrl', function($scope, $http, $ionicLoading) {
    $scope.data = [];

    $scope.loadmore = function(){
        $http.get('https://randomuser.me/api/?results=10').success(function(x){
            console.log(x);
            $scope.data = $scope.data.concat(x.results);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.loadmore();
});
app.controller('PolicyCtrl',function ($scope,$state,$ionicPopup,$http,$ionicLoading,$rootScope) {
    var guard = JSON.parse(window.localStorage.getItem('user'));

        $ionicLoading.show();
        $http.get($rootScope.domain + 'api/company/policy/'+guard.user.user.user_detail.company_id)
            .success(function (data) {
                $scope.data = data.policies;
                $ionicLoading.hide();
                console.log($scope.data);
            })
            .error(function (data) {
                $ionicLoading.show({
                    template: 'An error occured',
                    duration: '1200'
                })
            });
    $scope.confirmPolicy = function () {
        var guard = JSON.parse(window.localStorage.getItem('user'));
        $ionicLoading.show();
        $http.get($rootScope.domain + 'api/company/policy/confirm/'+guard.user.user.id)
            .success(function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Success',
                    template: "You Have Successfully Confirmed Our Policy"
                });

                console.log($scope.data);
            })
            .error(function (data) {
                $ionicLoading.hide();
                console.log(data);
                $ionicPopup.alert({
                    title: 'Error',
                    template: "An Error Occured"
                });
            });
    }

});
app.controller('payslip',function ($scope,$state,$cordovaFileOpener2,$ionicPopup,$http,$ionicLoading,$rootScope) {
    var guard = JSON.parse(window.localStorage.getItem('user'));
    $scope.payslips = function () {
        $ionicLoading.show();
        $http.get($rootScope.domain+'api/guard/payslips/'+ guard.user.user.id+'/'+guard.user.user.user_detail.company_id)
        .success(function (data) {
            $scope.data = data.payslips;
            $ionicLoading.hide();
            console.log($scope.data);
        })
        .error(function (data) {
            $ionicLoading.show({
                template:'An error occured',
                duration:'1200'
            })
        })
    };
    $scope.download = function (url,fileEntry,  readBinaryData) {
        $ionicLoading.show();
        var uri = encodeURI(url);
        var filename = url.split("/").pop();
         filename = filename.replace(/\s+/g, '_');
        console.log('checking plateform for ios '+ionic.Platform.isIOS());
        if(ionic.Platform.isIOS())
        {
            console.log(JSON.stringify(cordova.file));
            var fileURL = cordova.file.documentsDirectory+'/' + filename;

            var fileTransfer = new FileTransfer();

            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    /* var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: "payslip downloaded to : " + entry.toURL()
                     });*/
                    $cordovaFileOpener2.open(
                        entry.toURL(),
                        'application/pdf'
                    ).then(function() {
                        $ionicLoading.hide();
                        console.log('file Opened');
                    }, function(err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: "payslip downloaded to : " + entry.toURL()
                        });
                        console.log('file could not Open');
                        console.log(err);
                    });


                    console.log("download complete: " + entry.toURL());
                    console.log(cordova.file.dataDirectory);
                },
                function(error) {
                    $ionicLoading.show({
                        template:"Could not download File",
                        duration:'1200'
                    });
                    console.log(error);
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        }
        else {
            console.log(JSON.stringify(cordova.file));
            fileURL = cordova.file.externalRootDirectory+'/' + filename;

            fileTransfer = new FileTransfer();

            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    /* var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: "payslip downloaded to : " + entry.toURL()
                     });*/
                    $cordovaFileOpener2.open(
                        entry.toURL(),
                        'application/pdf'
                    ).then(function() {
                        $ionicLoading.hide();
                        console.log('file Opened');
                    }, function(err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: "payslip downloaded to : " + entry.toURL()
                        });
                        console.log('file could not Open');
                        console.log(err);
                    });


                    console.log("download complete: " + entry.toURL());
                    console.log(cordova.file.dataDirectory);
                },
                function(error) {
                    $ionicLoading.show({
                        template:"Could not download File",
                        duration:'1200'
                    });
                    console.log(error);
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        }


    };
    $scope.download2 = function (url,fileEntry,  readBinaryData) {
        $ionicLoading.show();
        console.log(url);

        url = url.replace('<a href="../', '');
        console.log(url);
        url = url.substring( 0, url.indexOf('"') );
        console.log(url);
        url = $rootScope.domain+url;
        console.log(url);
        var uri = encodeURI(url);
        var filename = url.split("/").pop();
        filename = filename.replace(/\s+/g, '_');
        console.log('checking plateform for ios '+ionic.Platform.isIOS());
        if(ionic.Platform.isIOS())
        {
            console.log(JSON.stringify(cordova.file));
            var fileURL = cordova.file.documentsDirectory+'/' + filename;

            var fileTransfer = new FileTransfer();

            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    /* var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: "payslip downloaded to : " + entry.toURL()
                     });*/
                    $cordovaFileOpener2.open(
                        entry.toURL(),
                        'application/pdf'
                    ).then(function() {
                        $ionicLoading.hide();
                        console.log('file Opened');
                    }, function(err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: "payslip downloaded to : " + entry.toURL()
                        });
                        console.log('file could not Open');
                        console.log(err);
                    });


                    console.log("download complete: " + entry.toURL());
                    console.log(cordova.file.dataDirectory);
                },
                function(error) {
                    $ionicLoading.show({
                        template:"Could not download File",
                        duration:'1200'
                    });
                    console.log(error);
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        }
        else {
            console.log(JSON.stringify(cordova.file));

            fileURL = cordova.file.externalRootDirectory+'/' + filename;
            console.log(filename);
            console.log(uri);
            console.log(fileURL);
            fileTransfer = new FileTransfer();

            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    /* var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: "payslip downloaded to : " + entry.toURL()
                     });*/
                    $cordovaFileOpener2.open(
                        entry.toURL(),
                        'application/pdf'
                    ).then(function() {
                        $ionicLoading.hide();
                        console.log('file Opened');
                    }, function(err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: "payslip downloaded to : " + entry.toURL()
                        });
                        console.log('file could not Open');
                        console.log(err);
                    });


                    console.log("download complete: " + entry.toURL());
                    console.log(cordova.file.dataDirectory);
                },
                function(error) {
                    $ionicLoading.show({
                        template:"Could not download File",
                        duration:'1200'
                    });
                    console.log(error);
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        }


    };
    $scope.payslips();
});
app.controller('TrainingCtrl',function ($scope,$state,$http,$ionicLoading,$rootScope,$ionicModal) {
    $ionicLoading.show();
    guard = JSON.parse(window.localStorage.getItem('user'));

    isCompany = guard.user.user.user_detail.role_id == 3 ? 1:0;
   var id = '';
    if(isCompany)
    {
        id = guard.user.user.id
    }
    else
    {
        id = guard.user.user.user_detail.company_id
    }
    $http.get($rootScope.domain+'api/training/'+id)
        .success(function (data) {
            $scope.data = data.training;
            $ionicLoading.hide();
            console.log(data);
        })
        .error(function (data) {
            $ionicLoading.show({
                template:'An error occured',
                duration:'1200'
            })
        });
    $ionicModal.fromTemplateUrl('templates/events/training-video.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.video = function (id) {
        $scope.data.forEach(function (video) {

            if(video.id == id.id)
            {
                $scope.detail = video;
            }

        });

        $scope.modal.show();
    };
    $scope.closeModal =function () {
        $scope.modal.hide();
    }
});
app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation ,$ionicLoading, $stateParams) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: $scope.latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        directionsDisplay.setMap($scope.map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        /*//Wait until the map is loaded
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){

            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });

            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am!"
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });

        });*/

    }, function(error){
        $ionicLoading.show({
            template:"Could not get location",
            duration:'1200'
        });
        $state.go('app.guarddash');
        console.log("Could not get location");
    });
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        directionsService.route({
            origin: $scope.latLng,
            destination: new google.maps.LatLng($stateParams.lat, $stateParams.log),
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                $ionicLoading.show({
                    template:'Directions request failed due to ' + status,
                    duration:'1200'
                });
                //window.alert('Directions request failed due to ' + status);
            }
        });
    }
});
