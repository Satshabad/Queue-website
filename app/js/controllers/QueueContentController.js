angular.module('queueapp').
controller('QueueContentCtrl',  ['$scope', '$sce', '$rootScope', 'Queue', 'User', 'Saved', 'Sent',
    function($scope, $sce, $rootScope, Queue, User, Saved, Sent) {

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.changeFilter = function (input) {
            $scope.query = input;
        };

        $scope.queue = [];
        $scope.saved = [];
        $scope.sent = [];
        $scope.displayMode = "queue";

        $scope.changeMode = function (mode) {
           $scope.displayMode = mode;

           switch (mode) {
               case 'queue':
                   $scope.saved = [];
                   $scope.sent = [];
                   _populateQueue();
                   break;
               case 'sent':
                   $scope.queue = [];
                   $scope.saved = [];
                   _populateSent();
                   break;
               case 'saved':
                   $scope.queue = [];
                   $scope.sent = [];
                   _populateSaved();
                   break;
           }

        };

        function _populateQueue(argument) {
            Queue.getItems(0).then(function(items) {
                $scope.queue = items;
            })
        }

        function _populateSaved() {
            Saved.getItems(0).then(function(items) {
                $scope.saved = items;
                console.log(items);
            })
        }

        function _populateSent() {
            Sent.getItems(0).then(function(items) {
                $scope.sent = items;
            })
        }

        if (User.isLoggedIn()) {
            _populateQueue()
        } else {
            User.softLogin().then(function() {
                _populateQueue()
            })
        }

    }
]);
