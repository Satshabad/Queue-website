'use strict';

/* Services */

angular.module('queue.services', []).

  // The service for all user interactions
  factory('User', function(Facebook){
    var accessToken, id;
    
    function getLoginStatus(callback){
      Facebook.getLoginStatus(function (isLoggedIn, authResponse) {
        if (isLoggedIn) {
          accessToken = authResponse.accessToken
          // TODO: Verify with our servers here and get userId
          callback("logged_in")
        } else {
          callback("logged_out")
        }
        
      });
    }


    function login(onSuccess, onFail){

      Facebook.login(
      // onSuccess 
      function (authResponse) {
        accessToken = authResponse.accessToken;
        // TODO: Verify with our servers here and get userId
        onSuccess();
      },
      // onFail
      function () {
       onFail() 
      });

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

  }).

  // The Facebook service. It's a thin wrapper on the FB library
  factory('Facebook', function () {
    var FB;

    function init(facebookLibrary) {
      FB = facebookLibrary;
      console.log("FB inited");
    }

    function login(onSuccess, onFail){
      if (FB === undefined){
        throw new Error("You must init this service first")
      } else {

        FB.login(function (response) {
          console.log(response);
          if (response.status === 'connected') {
            onSuccess(response.authResponse);
          } else {
            onFail();
          }
        });

      }
    }

    function getLoginStatus(callback) {
      FB.getLoginStatus(function (response) {
        if (response.status === "connected"){
          callback(true, response.authResponse)
        } else {
          callback(false, response.authResponse)
        }
      });

    }
    
    return {
      init: init,
      getLoginStatus: getLoginStatus,
      login: login
      }

  });

