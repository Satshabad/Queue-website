angular.module('queueapp').
controller('LoginCtrl', ['$scope', 'User', '$location',
    function($scope, User, $location) {

        if (User.isLoggedIn()){
            $location.path('/queue')
        } else {
            User.softLogin().then(function () {
                $location.path('/queue')
            })
        }

        $scope.login = function() {
            User.login().then(function () {
                $location.path('/queue')
            })

        }

}]);

