'use strict';

angular.module('queueapp').
controller('LoginCtrl', ['$scope', 'User', 'Queue', 'Search', 'Listens',
    function($scope, User, Queue, Search, Listens) {

        $scope.login = function() {



            User.login().then(function() {

                console.log("Now you're logged in");

                Queue.getItems().then(function(items) {
                    console.log(items);
                })

                Search.getTracks("Franz").then(function(results) {
                    console.log(results);
                })

                Search.getArtists("Franz").then(function(results) {
                    console.log(results);
                })

                Listens.getTracks().then(function(tracks) {
                    console.log(tracks);
                })

            }).
            catch (function() {
                console.log("could not log in");
            });

        }

    }
]);
