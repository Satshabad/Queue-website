'use strict';

angular.module('queueapp').
controller('NavBarCtrl', ['$scope', 'Search', 'Listens', '$modal',
    function($scope, Search, Listens, $modal) {

        $scope.$on('successShare',function () {
            $scope.modalInstance.close()
        })

        $scope.showAddView = function() {

            $scope.modalInstance = $modal.open({
                templateUrl: 'partials/addingModal.html',
                scope: $scope
            })

        }

}]);
