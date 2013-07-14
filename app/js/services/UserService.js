'use strict';

/* Services */

angular.module('queue').

  // The service for all user interactions
  factory('User', function(Facebook, $q){
    var accessToken, id;
    
    function getLoginStatus(){
      var deferred = $q.defer();

      Facebook.getLoginStatus().then(function (value) {
        if (value.loggedIn){
          // TODO: Verify with our servers here and get userId
          accessToken = value.authResponse.accessToken
        }
        deferred.resolve(value.loggedIn)
      }, function () {
        deferred.reject("Could not check status") 
      });

      return deferred.promise
    }


    function login(){
      var deferred = $q.defer()

      Facebook.login().then(function (authResponse) {

        accessToken = authResponse.accessToken;
        // TODO: verify with servers
        deferred.resolve()
      },  function (reason) {
        deferred.reject()
      });

      return deferred.promise

    }


    function getUser() {
      return {
        accessToken: accessToken,
        id: id
        }
    }

    // The external API. Only functions so that we
    // can update internally after injection
    return {
      getUser: getUser,
      login: login,
      getLoginStatus: getLoginStatus
    }

  });
