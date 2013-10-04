'use strict';

angular.module('queueapp').
controller('QueueViewCtrl', ['$scope', '$rootScope', 'Queue', 'Saved',
    function($scope, $rootScope, Queue, Saved) {

        $scope.queue = []
        $scope.saved = []

        $scope.changeCurrentItem = function(index) {
            $scope.currentItemIndex = index;
            $scope.currentItem = $scope.queue[index];
        }

        $scope.addItemToQueue = function (item) {
            Queue.addItem(item).then(function () {
                console.log("item added");
            })
        };

        $scope.saveQueueItem = function (item) {
            Queue.saveItem(item).then(function () {
                console.log("item saved");
            })
        };

        $scope.deleteQueueItem = function (item, index) {
            Queue.deleteItem(item).then(function () {
                $scope.queue.splice(index,1);
            })
        };

        $scope.deleteSavedItem = function (item, index) {
            Saved.deleteItem(item).then(function () {
                $scope.saved.splice(index,1);
            })
        };

        $rootScope.$on('login', function() {
            Queue.getItems().then(function(items) {
                $scope.queue = items;
                $scope.currentItemIndex = 0;
                $scope.currentItem = $scope.queue[$scope.currentItemIndex];
            })
        })

    }
]);
