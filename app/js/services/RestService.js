'use strict';

angular.module('queueapp').
factory('Queue', function($resource, User) {

    var Queue = $resource('http://localhost:8000/user/:userId/queue/:id', {
        id: '@id',
        userId: _findUserId
    }, {
        query: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).queue.items;
            }
        }
    });

    function addItem(itemData) {
        delete itemData.itemId
        var item = new Queue(itemData)
        item.$save()
    }

    function getItems() {
        return Queue.query().$promise
    }

    function _findUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }

    return {
        "addItem"  :  addItem,
        "getItems" :  getItems
    }


})


angular.module('queueapp').
factory('Saved', function($resource, User) {

    var Saved = $resource('http://localhost:8000/user/:userId/saved/:id', {
        id: '@id',
        userId: _findUserId
    }, {
        query: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).Saved.items;
            }
        }
    });

    function getItems() {
        return Saved.query().$promise
    }

    function _findUserId() {
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


angular.module('queueapp').
factory('Sent', function($resource, User) {

    var Sent = $resource('http://localhost:8000/user/:userId/sent/:id', {
        id: '@id',
        userId: _findUserId
    }, {
        query: {
            isArray: true,
            method: 'get',
            transformResponse: function(data, headers) {
                return JSON.parse(data).Sent.items;
            }
        }
    });

    function getItems() {
        return Sent.query().$promise
    }

    function _findUserId() {
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
