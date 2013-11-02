'use strict';


angular.module('queueapp').
factory('ResourceFactory', function($resource, User, config) {

    function initResource(name) {
        return $resource('http://'+config['hostname']+'/user/:userId/'+name+'/:itemId', {
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

    function _areSimilar(item1, item2) {
        return (item1.type === item2.type &&
                item1[item1.type].name === item2[item2.type].name &&
                angular.equals(item1[item1.type].images, item2[item2.type].images))
    }

    function getItems(page) {

        return Sent.query({"page": page, "size": 30}).$promise.then(function (items) {

            var collapsedItems = [];
            for (var i = 0, l = items.length; i < l; i ++) {
                var startItem = angular.copy(items[i])
                startItem.toUsers = [startItem.toUser]
                delete startItem.toUser

                // If on last item, no more to collapse into it
                if (i === l - 1){
                    collapsedItems.push(startItem)
                    break
                }

                while (_areSimilar(startItem, items[i+1])){
                    startItem.toUsers.push(angular.copy(items[i+1].toUser))
                    i++;

                    if (i === l - 1){
                        break
                    }

                }
                collapsedItems.push(startItem)
            }
            return collapsedItems

        })

    }

    return {
        "getItems" :  getItems
    }

})
