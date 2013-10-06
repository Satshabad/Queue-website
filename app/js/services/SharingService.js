angular.module('queueapp').
factory('Sharing', function($http, User) {

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
        return $http.post('http://localhost:8000/fbuser/'+ fbId.toString() +'/queue', item)

    }

    return {
        "shareByFbId" : shareByFbId
    }
})
