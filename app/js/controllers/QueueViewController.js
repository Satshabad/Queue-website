'use strict';

angular.module('queueapp').
controller('QueueViewCtrl', ['$scope', '$rootScope', 'Queue',
    function($scope, $rootScope, Queue) {

        $scope.queue = []

        $scope.changeCurrentItem = function(index) {
            $scope.currentItemIndex = index;
        }

        $rootScope.$on('login', function() {
            Queue.getItems().then(function(items) {
                $scope.queue = items;
                $scope.currentItemIndex = 0;
            })
        })

    }
]);
