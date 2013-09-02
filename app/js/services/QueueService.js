'use strict';

angular.module('queueapp').
factory('Queue', function($resource, User) {

    var Queue = $resource('http://localhost:8000/user/:userId/queue/:id', {
        id: '@id',
        userId: findUserId
    }, {
        query: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).results;
            }
        }
    });

    function getItems() {
        return Queue.query().$promise
    }

    function findUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }


    return {
        "getItems" :  getItems
    }


})
