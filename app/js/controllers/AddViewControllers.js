angular.module('queueapp').
controller('ModalAddViewCtrl', ['$scope',
    function($scope) {

    }
])

angular.module('queueapp').
controller('PickerViewCtrl', ['$scope', 'Search', 'Listens', 'Facebook',
    function($scope, Search, Listens, Facebook) {

        $scope.mode = 'listens' // or 'search'

        $scope.listens = [];
        $scope.cachedListens = [];

        $scope.searchResults = [];
        $scope.cachedSearchResults = [];
        $scope.searchResults.busy = false;

        $scope.enableSearchMode = function() {
            $scope.mode = 'search'
            $scope.listens = [];
            $scope.searchResults = $scope.cachedSearchResults;
        };

        $scope.enableListensMode = function() {
            $scope.mode = 'listens'
            $scope.searchResults = [];
            $scope.listens = $scope.cachedListens;
        };

        $scope.changeSelectedItem = function(index, item) {
            $scope.selectedItemIndex = index;

            $scope.currentItem = item
            $scope.$parent.selectedItem = item

        }

        Listens.getTracks().then(function(tracks) {
            $scope.listens = tracks;
            $scope.cachedListens = tracks;
        })

        $scope.doSearch = function() {

            if ($scope.searchResults.busy === true) {
                return
            }

            $scope.searchResults.busy = true;
            var searchTerm = $scope.searchTerm;

            Search.getTracks(searchTerm).then(function(results) {
                $scope.searchResults = results;
                $scope.cachedSearchResults = results
                $scope.searchResults.busy = false;
            })

        };

    }
])


angular.module('queueapp').
controller('ShareViewCtrl', ['$scope', 'Facebook',
    function($scope, Facebook) {

    }
])
