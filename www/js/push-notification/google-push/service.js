
app.service('Push', function($http, $q) {
  return {
      send: function(data, url){
        //alert(data);
        return $q(function(resolve, reject){             
            $http({
              method: 'POST',
              url: url,
              headers: {'Authorization': 'key='+window.global.GCM_SERVER_KEY, 'Content-Type': 'application/json' },
              data: data
            })
            .success(function(x){
                resolve(x);                     
            })
            .error(function(err){
                reject(err);
            });
        })
      }
    }
})
