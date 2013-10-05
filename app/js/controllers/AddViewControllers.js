angular.module('queueapp').
controller('ShareViewCtrl', ['$scope', 'Search', 'Listens', 'Facebook',
    function($scope, Search, Listens, Facebook) {

        $scope.listens = [];
        $scope.searchResults= [];
        $scope.searchResults.busy = false;

        $scope.changeSelectedItem = function(index) {
            $scope.selectedItemIndex = index;
            $scope.currentItem = $scope.queue[index];
        }

        Listens.getTracks().then(function(tracks) {
            $scope.listens = tracks;
        })

        $scope.doSearch = function () {

            if ($scope.searchResults.busy === true){
                return
            }

            $scope.searchResults.busy = true;
            var searchTerm = $scope.searchTerm;

            Search.getTracks(searchTerm).then(function(results) {
                $scope.searchResults = results;
                $scope.searchResults.busy = false;
            })

        };


}])

