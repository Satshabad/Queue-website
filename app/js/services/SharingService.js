angular.module('queueapp').
factory('Sharing', function($http, User, config) {

    function _massageUser(user) {
        user.userID = user.id
    }

    function _massageItem(item) {
        item.type = 'song'
    }

    function shareByFbId(fbId, item) {

        var user = User.getUser()
        _massageUser(user)

        item.fromUser = user;
        _massageItem(item)
        return $http.post('http://'+config['hostname']+'/fbuser/'+ fbId.toString() +'/queue', item)

    }

    function addToOwnQueue(item) {

        var user = User.getUser()
        _massageUser(user)

        item.fromUser = user;
        _massageItem(item)
        return $http.post('http://'+config['hostname']+'/user/'+ user.userID.toString() +'/queue', item)

    }

    return {
        "shareByFbId"   :  shareByFbId,
        "addToOwnQueue" :  addToOwnQueue
    }
})

