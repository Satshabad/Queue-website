'use strict';


angular.module('queueapp').
factory('ResourceFactory', function($resource, User) {

    function initResource(name) {
        return $resource('http://localhost:8000/user/:userId/'+name+'/:itemId', {
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
    }

    function _findUserId() {
        var id = User.getUser().id;

        if (id === undefined) {
            throw "User not authenticated"
        }

        return id;
    }

    return {
        "initResource" :  initResource
    }

})

angular.module('queueapp').
factory('Queue', function($resource, User, ResourceFactory) {

    var Queue = ResourceFactory.initResource('queue')

    function addItem(itemData) {
        delete itemData.itemId;
        var item = new Queue(itemData);
        return item.$save()
    }

    function saveItem(item) {
        item.saved = 1;
        return item.$save();
    }

    function deleteItem(item) {
        return item.$remove();
    }

    function getItems(page) {
        return Queue.query({"page":page}).$promise;
    }

    return {
        "deleteItem" :  deleteItem,
        "saveItem"   :  saveItem,
        "addItem"    :  addItem,
        "getItems"   :  getItems
    }

})


angular.module('queueapp').
factory('Saved', function($resource, User, ResourceFactory) {

    var Saved = ResourceFactory.initResource('saved')

    function deleteItem(item) {
        return item.$remove();
    }

    function getItems(page) {
        return Saved.query({"page":page}).$promise;
    }

    return {
        "getItems"   :  getItems,
        "deleteItem" :  deleteItem
    }

})


angular.module('queueapp').
factory('Sent', function($resource, User, ResourceFactory) {

    var Sent = ResourceFactory.initResource('sent')

    function getItems(page) {
        return Sent.query({"page":page}).$promise;
    }

    return {
        "getItems" :  getItems
    }

})
