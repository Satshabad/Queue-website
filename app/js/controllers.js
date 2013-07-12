'use strict';

/* Controllers */

angular.module('queue.controllers', []).
  controller('LoginCtrl', ['$scope', 'User', function($scope, User) {


    $scope.login = function () {
      User.getLoginStatus(function (status) {

        if (status === "logged_in"){
          console.log("You're already logged in!");
        } else if (status === "logged_out") {

          User.login(
            // onSuccess 
            function () {
              console.log(User.getUser());
            },
            // onFail
            function () {
              
            });
        }
        
      });

    };


  }]);
