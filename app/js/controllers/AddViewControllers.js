angular.module('queueapp').
controller('ModalAddViewCtrl', ['$scope',
    function($scope) {

    }
])

angular.module('queueapp').
controller('PickerViewCtrl', ['$scope', 'Search', 'Listens', 'Facebook', 'User',
    function($scope, Search, Listens, Facebook, User) {

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

        function _populateRecentListens() {

            Listens.getTracks().then(function(tracks) {
                $scope.listens = tracks;
                $scope.cachedListens = tracks;
            })

        }

        if (User.isLoggedIn()) {
            _populateRecentListens()

        } else {

            User.softLogin().then(function() {
                _populateRecentListens()
            })

        }

    }
])


angular.module('queueapp').
controller('ShareViewCtrl', ['$scope', 'Facebook', 'Sharing', '$q',
    function($scope, Facebook, Sharing, $q) {

        $scope.friends = [];
        $scope.selectedFriends = [];

        Facebook.api('me/friends').then(function (results) {
            $scope.friends = results.data
        })

        $scope.submit = function () {
            defereds = []
            for (var i = 0, l = $scope.selectedFriends.length; i < l; i ++) {
                defereds.push(Sharing.shareByFbId($scope.selectedFriends[i].id, $scope.$parent.selectedItem))
            }

            $q.all(defereds).then(function () {
                $scope.$emit('successShare')
            })

        };
    }
])
