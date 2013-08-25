'use strict';

angular.module('queueapp').
factory('Listens', function($resource, User) {

    var Queue = $resource('http://localhost:8000/user/:userId/listens', {
        userId: getUserId
    }, {
        tracks: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).recentTracks.tracks;
            }
        }
    });

    function getTracks() {
        return Queue.tracks().$promise
    }

    function getUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }

    return {
        "getTracks" :  getTracks
    }


})
