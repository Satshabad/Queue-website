angular.module('queueapp').
controller('LoginCtrl', ['$scope', 'User', '$location',
    function($scope, User, $location) {

        $scope.login = function() {
            User.login().then(function () {
                $location.path('/queue')
            })

        }

}]);

