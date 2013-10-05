'use strict';

angular.module('queueapp').
controller('NavBarCtrl', ['$scope', 'Search', 'Listens', '$modal',
    function($scope, Search, Listens, $modal) {

        $scope.showAddView = function() {

            var modalInstance = $modal.open({
                templateUrl: 'partials/addingModal.html',
            })

        }

    $scope.login = function() {

        User.login().then(function() {

            console.log("Now you're logged in");

            Queue.getItems().then(function(items) {
                console.log(items);
            })

            // Search.getTracks("Franz").then(function(results) {
            //     console.log(results);
            // })

            // Search.getArtists("Franz").then(function(results) {
            //     console.log(results);
            // })

            // Listens.getTracks().then(function(tracks) {
            //     console.log(tracks);
            // })

        }).
        catch (function() {
            console.log("could not log in");
        });

    }

}]);
