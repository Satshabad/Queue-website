'use strict';

angular.module('queueapp').
factory('Queue', function($resource, User) {

    var Queue = $resource('http://localhost:8000/user/:userId/queue/:itemId', {
        itemId: '@itemId',
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
        delete itemData.itemId;
        var item = new Queue(itemData);
        return item.$save().$promise;
    }

    function saveItem(item) {
        item.saved = 1;
        return item.$save().$promise;
    }

    function deleteItem(item) {
        return item.$remove().$promise;
    }

    function getItems() {
        return Queue.query().$promise;
    }

    function _findUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }

    return {
        "deleteItem" :  deleteItem,
        "saveItem"   :  saveItem,
        "addItem"    :  addItem,
        "getItems"   :  getItems
    }


})


angular.module('queueapp').
factory('Saved', function($resource, User) {

    var Saved = $resource('http://localhost:8000/user/:userId/saved/:itemId', {
        itemId: '@itemId',
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

    function getItems() {
        return Saved.query().$promise
    }

    function deleteItem(item) {
        item.$remove().$promise;
    }

    function _findUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }

    return {
        "deleteItem" :  deleteItem,
        "getItems"   :  getItems
    }


})


angular.module('queueapp').
factory('Sent', function($resource, User) {

    var Sent = $resource('http://localhost:8000/user/:userId/sent/:itemId', {
        itemId: '@itemId',
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
