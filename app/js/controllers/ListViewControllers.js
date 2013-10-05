'use strict';

angular.module('queueapp').
controller('ListViewCtrl', ['$scope',
    function($scope) {

    }
]);

angular.module('queueapp').
controller('QueueViewCtrl', ['$scope', '$rootScope', 'Queue', 'User',
    function($scope, $rootScope, Queue, User) {

        $scope.queue = []
        $scope.queue.busy = false
        $scope.page = 0

        if (User.isLoggedIn()) {

            Queue.getItems(0).then(function(items) {

                $scope.queue = items;
                $scope.currentItemIndex = 0;
                $scope.currentItem = $scope.queue[$scope.currentItemIndex];
            })

        } else {

            $rootScope.$on('login', function() {

                Queue.getItems(0).then(function(items) {

                    $scope.queue = items;
                    $scope.currentItemIndex = 0;
                    $scope.currentItem = $scope.queue[$scope.currentItemIndex];
                })

            })

        }

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

        $scope.loadMoreItems = function () {

            if ($scope.queue.busy === true){
                return
            }

            $scope.queue.busy = true
            Queue.getItems($scope.queue.page + 1).then(function(items) {

                for (var i = 0; i < items.length; i++) {
                    $scope.queue.push(items[i]);
                }

                $scope.queue.page++;
                $scope.queue.busy = false
            })
        };

    }
]);


angular.module('queueapp').
controller('SavedViewCtrl', ['$scope', '$rootScope', 'Saved', 'User',
    function($scope, $rootScope, Saved, User) {

        $scope.saved = []
        $scope.saved.busy = false
        $scope.saved.page = 0


        if (User.isLoggedIn()) {

            Saved.getItems(0).then(function(items) {

                $scope.saved = items;
                $scope.currentItemIndex = 0;
                $scope.currentItem = $scope.saved[$scope.currentItemIndex];
            })

        } else {

            $rootScope.$on('login', function() {

                Saved.getItems(0).then(function(items) {

                    $scope.saved = items;
                    $scope.currentItemIndex = 0;
                    $scope.currentItem = $scope.saved[$scope.currentItemIndex];
                })
            })

        }

        $scope.changeCurrentItem = function(index) {
            $scope.currentItemIndex = index;
            $scope.currentItem = $scope.queue[index];
        }

        $scope.deleteSavedItem = function (item, index) {
            Saved.deleteItem(item).then(function () {
                $scope.saved.splice(index,1);
            })
        };

        $scope.loadMoreItems = function () {

            if ($scope.saved.busy === true){
                return
            }

            $scope.saved.busy = true
            Saved.getItems($scope.saved.page + 1).then(function(items) {

                for (var i = 0; i < items.length; i++) {
                    $scope.saved.push(items[i]);
                }

                $scope.saved.page++;
                $scope.saved.busy = false
            })
        };

    }
]);


angular.module('queueapp').
controller('SentViewCtrl', ['$scope', '$rootScope', 'Sent', 'User',
    function($scope, $rootScope, Sent, User) {

        $scope.sent = []
        $scope.sent.busy = false
        $scope.sent.page = 0


        if (User.isLoggedIn()) {

            Sent.getItems(0).then(function(items) {

                $scope.sent = items;
                $scope.currentItemIndex = 0;
                $scope.currentItem = $scope.sent[$scope.currentItemIndex];
            })

        } else {

            $rootScope.$on('login', function() {

                Sent.getItems(0).then(function(items) {

                    $scope.sent = items;
                    $scope.currentItemIndex = 0;
                    $scope.currentItem = $scope.sent[$scope.currentItemIndex];
                })
            })

        }

        $scope.changeCurrentItem = function(index) {
            $scope.currentItemIndex = index;
            $scope.currentItem = $scope.queue[index];
        }

        $scope.loadMoreItems = function () {

            if ($scope.sent.busy === true){
                return
            }

            $scope.sent.busy = true
            Sent.getItems($scope.sent.page + 1).then(function(items) {

                for (var i = 0; i < items.length; i++) {
                    $scope.sent.push(items[i]);
                }

                $scope.sent.page++;
                $scope.sent.busy = false
            })
        };

    }
]);
