'use strict';

angular.module('queueapp').
controller('NavBarCtrl', ['$scope', 'Search', 'Listens', '$modal',
    function($scope, Search, Listens, $modal) {

        $scope.showAddView = function() {

            var modalInstance = $modal.open({
                templateUrl: 'partials/addingModal.html',
            })

        }

}]);
