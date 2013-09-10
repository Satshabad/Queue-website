'use strict';

angular.module('queueapp').
controller('QueueViewCtrl', ['$scope', '$rootScope', 'Queue',
    function($scope, $rootScope, Queue) {

        $scope.queue = []

        $scope.changeCurrentItem = function(index) {
            $scope.currentItemIndex = index;
            $scope.currentItem = $scope.queue[index];
        }

        $rootScope.$on('login', function() {
            Queue.getItems().then(function(items) {
                $scope.queue = items;
                $scope.currentItemIndex = 0;
                $scope.currentItem = $scope.queue[$scope.currentItemIndex];
            })
        })

    }
]);
