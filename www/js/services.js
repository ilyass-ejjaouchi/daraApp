var app = angular.module('visa.services', []);
app.service('user',function (user) {
  var guard = user;
});
app.service('Signature', function () {
  var image = '';
  var getImage = function(){

        return image;
  };

  var saveImage  = function(img){
    image = img;
  };

  return {
    getImage: getImage,
    saveImage : saveImage
  };
});
app.service('DashList', function() {

  /*var menu = [
    {
      id: 1,
      title: 'Push Notification',
      icon: 'ion-android-notifications',
      submenu: [{
        id: 11,
        title: 'Local Push Notification',
        icon: 'ion-android-notifications-none',
        state: 'app.localpush'
      },{
        id: 12,
        title: 'Real Push Notification',
        icon: 'ion-android-notifications',
        state: 'app.googlepush'
      }]
    },{
      id: 2,
      title: 'Social Login',
      icon: 'ion-social-googleplus',
      submenu: [{
        id: 21,
        title: 'Facebook',
        icon: 'ion-social-facebook',
        state: 'app.fblogin'
      },{
        id: 22,
        title: 'Google Plus ',
        icon: 'ion-social-googleplus',
        state: 'app.gplogin'
      }]
    },{
      id: 3,
      title: 'Hardware',
      icon: 'ion-network',
      submenu: [{
        id: 31,
        title: 'Vibration',
        icon: 'visa-icon-vibration',
        state: 'app.vibra'
      },{
        id: 32,
        title: 'Toast',
        icon: 'ion-alert-circled',
        state: 'app.toast'
      },{
        id: 33,
        title: 'Dialogs',
        icon: 'ion-android-alert',
        state: 'app.dialog'
      },{
        id: 34,
        title: 'Flashlight',
        icon: 'ion-flash',
        state: 'app.flash'
      },{
        id: 35,
        title: 'Camera',
        icon: 'ion-camera',
        state: 'app.impicker'
      },{
        id: 36,
        title: 'Device Information',
        icon: 'ion-information-circled',
        state: 'app.devinfo'
      },{
        id: 37,
        title: 'Network Information',
        icon: 'ion-wifi',
        state: 'app.netinfo'
      }]
    },{
      id: 4,
      title: 'Maps',
      icon: 'ion-map',
      submenu: [{
        id: 41,
        title: 'Get Current Position',
        icon: 'ion-android-locate',
        state: 'app.currentlocation'
      },{
        id: 42,
        title: 'Native Navigation',
        icon: 'ion-location',
        state: 'app.navigator'
      }]
    },{
      id: 5,
      title: 'CRUD',
      icon: 'ion-android-create',
      submenu: [{
        id: 51,
        title: 'Using LocalStorage',
        icon: 'ion-archive',
        state: 'app.localstorage'
      },{
        id: 52,
        title: 'Using Backand',
        icon: 'ion-upload',
        state: 'app.backand'
      }]
    },{
      id: 6,
      title: 'Themes',
      icon: 'ion-easel',
      submenu: [{
        id: 61,
        title: 'Dashboard',
        icon: 'ion-android-home',
        state: 'app.dash'
      },{
        id: 62,
        title: 'News Category',
        icon: 'ion-grid',
        state: 'app.newscategory'
      },{
        id: 63,
        title: 'E-Commerce',
        icon: 'ion-bag',
        state: 'app.ecommerce'
      },{
        id: 64,
        title: 'Hotel App',
        icon: 'visa-icon-office',
        state: 'app.hotel'
      },{
        id: 65,
        title: 'Social Media',
        icon: 'ion-android-share-alt',
        state: 'app.socialmedia'
      }]
    },{
      id: 7,
      title: 'Features',
      icon: 'ion-star',
      submenu: [{
        id: 71,
        title: 'Pull-to-Refresh',
        icon: 'ion-android-refresh',
        state: 'app.pull'
      },{
        id: 72,
        title: 'Load More Infinitely',
        icon: 'ion-load-a',
        state: 'app.infinite'
      },{
        id: 73,
        title: 'Pinch & Zoom Images',
        icon: 'ion-arrow-expand',
        state: 'app.pinchzoom'
      },{
        id: 74,
        title: 'Back to Top',
        icon: 'ion-android-arrow-up',
        state: 'app.backtotop'
      },{
        id: 75,
        title: 'Youtube API',
        icon: 'ion-social-youtube-outline',
        state: 'app.youtube'
      },{
        id: 76,
        title: 'Social Share',
        icon: 'ion-android-share-alt',
        state: 'app.share'
      },{
        id: 77,
        title: 'Call, Email & SMS',
        icon: 'ion-email',
        state: 'app.callemailsms'
      },{
        id: 78,
        title: 'Image Picker',
        icon: 'ion-images',
        state: 'app.impicker'
      },{
        id: 79,
        title: 'AdMob',
        icon: 'ion-cash',
        state: 'app.admob'
      }]
    },{
      id: 8,
      title: 'Ionic Material',
      icon: 'ion-android-favorite',
      submenu: [{
        id: 81,
        title: 'Components',
        icon: 'ion-ionic',
        state: 'app.component'
      },{
        id: 82,
        title: 'Motion List',
        icon: 'ion-clipboard',
        state: 'app.motionlist'
      }]
  }];*/
  var menu = [
    {
      id: 1,
      title: 'Main Menu',
      icon: 'ion-android-notifications',
      submenu: [{
        id: 11,
        title: 'Dashboard',
        icon: 'ion-grid',
        state: 'app.guarddash'
      },{
        id: 12,
        title: 'Logout',
        icon: 'ion-log-out',
        state: 'app.logout'
      }]
    }];

  var getMenuById = function(id){
    for(var i in menu){
      if(menu[i].id == id)
        return menu[i];
    }
  };

  var getAllMenu  = function(){
    return menu;
  }

  return {
    getMenuById: getMenuById,
    getAllMenu : getAllMenu
  };
});
