'use scrict';

  // The Facebook service. It's a thin wrapper on the FB library
angular.module('queueapp').
  factory('Facebook', function ($q, $rootScope) {
    var FB;

    function init(facebookLibrary) {
      FB = facebookLibrary;
    }

    function login(){
      if (FB === undefined){
        throw new Error("You must init this service first");
      }

      var deferred = $q.defer();

      FB.login(function (response) {
        $rootScope.safeApply(function () {
          if (response.status === 'connected') {

            $rootScope.safeApply(function () { deferred.resolve(response.authResponse)});
          } else {
            deferred.reject("could not login");
          }
        });
      });

      return deferred.promise;

    }

    function api(path) {
      var deferred = $q.defer();

      FB.api(path, function(response) {
        $rootScope.safeApply(function () { deferred.resolve(response)});

      });

      return deferred.promise;
    }

    function getLoginStatus() {
      if (FB === undefined){
        throw new Error("You must init this service first");
      }

      var deferred = $q.defer();

      FB.getLoginStatus(function (response) {

        $rootScope.safeApply(function () {
          if (response.status === "connected"){
            response.loggedIn = true
          } else {
            response.loggedIn = false
          }

        $rootScope.safeApply(function () { deferred.resolve(response)});
        });

      });

      return deferred.promise

    }

    return {
      init: init,
      getLoginStatus: getLoginStatus,
      login: login,
      api: api
      }

  });
