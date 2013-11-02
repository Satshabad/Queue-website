'use strict';

angular.module('queueapp').
factory('Search', function($resource, $rootScope) {

    var Queue = $resource('http://'+$rootScope.config['hostname']+'/search/:query', {}, {
        artists: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).artistResults
            }
        },
        tracks: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).trackResults
            }
        }
    });

    function getArtists(queryString) {
        return Queue.artists({query: queryString}).$promise
    }

    function getTracks(queryString) {
        return Queue.tracks({query: queryString}).$promise
    }

    return {
        "getArtists" :  getArtists,
        "getTracks"  :  getTracks
    }


})
