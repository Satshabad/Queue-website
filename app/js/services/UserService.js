'use strict';

/* Services */

angular.module('queueapp').

// The service for all user interactions
factory('User', function(Facebook, $q, $http, $rootScope, $resource) {
    var user = {};
    var isLoggedBool = false;

    function login() {
        return Facebook.login().then(function(loginStatus) {

            user.accessToken = loginStatus.accessToken;
            user.facebookID = loginStatus.userID

            var tryToGetMe = Facebook.api('/me'),
                tryToGetPic = Facebook.api('/me/picture');

            return $q.all([tryToGetMe, tryToGetPic])

        }).then(function(results) {

            var me = results[0],
                pic = results[1];

            user.fullName = me.first_name + " " + me.last_name;
            user.picture = pic.data.url;

            var postParams = {
                "accessToken" :  user.accessToken,
                "fbId"        :  user.facebookID,
                "fullName"    :  user.fullName,
                "imageLink"   :  user.picture
            };

            return $http.post('http://localhost:8000/login', postParams)

        }).then(function(response) {
            user.id = response.data.userID
            isLoggedBool = true;
        $rootScope.$broadcast('login')
        }).
        catch (function(reason) {
            console.log("there was an error!");
            throw reason;
        })

    }

    function getUser() {
        return user;
    }

    function isLoggedIn() {
        return isLoggedBool;
    }

    function setLastFMName(name) {
        user.lastFMUsername = name
        return $http.put('http://localhost:8000/user/'+user.id.toString(), user)
    }

    // The external API. Only functions so that we
    // can update internally after injection
    return {
        "setLastFMName" :  setLastFMName,
        "isLoggedIn"    :  isLoggedIn,
        "getUser"       :  getUser,
        "login"         :  login,
    }
});
