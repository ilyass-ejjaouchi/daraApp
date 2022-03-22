app.service('BackandService', function ($http, Backand) {
  var baseUrl = '/1/objects/';
 
  function getUrl(object) {
    return Backand.getApiUrl() + baseUrl + object + '/';
  }
 
  function getUrlForId(object, id) {
    return getUrl(object) + id;
  }
 
  read = function (object) {
    return $http.get(getUrl(object));
  }

  readById = function (object, id) {
    return $http.get(getUrlForId(object, id));
  }
 
  create = function(object, data) {
    return $http.post(getUrl(object), data);
  }

  update = function (object, id, data) {
    return $http.put(getUrlForId(object, id), data);
  };
 
  remove = function (object, id) {
    return $http.delete(getUrlForId(object, id));
  };
 
  return {
    read: read,
    readById: readById,
    create: create,
    update: update,
    remove: remove
  }
})