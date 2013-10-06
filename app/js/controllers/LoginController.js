angular.module('queueapp').
controller('LoginCtrl', ['$scope', 'User', '$location',
    function($scope, User, $location) {

        if (User.isLoggedIn()){
            // uncomment this when you are tired of seeing the login page
            // $location.path('/queue')
        }

        $scope.login = function() {
            User.login().then(function () {
                $location.path('/queue')
            })

        }

}]);

