'use strict';

angular.module('queueapp').
factory('Search', function($resource, config) {

    var Queue = $resource('http://'+config['hostname']+'/search/:query', {}, {
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
