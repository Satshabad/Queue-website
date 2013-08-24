'use strict';

angular.module('queue').
controller('LoginCtrl', ['$scope', 'User',
    function($scope, User) {

        $scope.login = function() {

            if (User.isLoggedIn()) {
                console.log("You're already logged in!");
            } else {

                User.login().then(function() {

                    console.log("Now you're logged in");
                    console.log(User.getUser());

                }).
                catch (function() {
                    console.log("could not log in");
                });

            }
        }

    }
]);
