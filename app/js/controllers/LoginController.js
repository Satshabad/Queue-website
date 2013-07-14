'use strict';

angular.module('queue').
  controller('LoginCtrl', ['$scope', 'User', function($scope, User) {


    $scope.login = function () {
      User.getLoginStatus().then(function (isLoggedIn) {
        if (isLoggedIn){
          console.log("You're already logged in!");
        } else {

          User.login().then(function () {
            console.log("Now you're logged in");
            console.log(User.getUser());
          }, function (reason) {
            console.log("could not log in");
          });

        }
      }, function (reason) {
        console.log("could not check status because" + reason);
      });

    };


  }]);
