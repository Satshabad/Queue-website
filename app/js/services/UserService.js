'use strict';

/* Services */

angular.module('queueapp').

// The service for all user interactions
factory('User', function(Facebook, $q, $http, $rootScope, $resource) {
    var user = {};

    function login() {
        return Facebook.getLoginStatus().then(function(loginStatus) {

            user.accessToken = loginStatus.authResponse.accessToken;
            user.facebookID = loginStatus.authResponse.userID

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
            console.log("broadcasting login");
            $rootScope.$broadcast('login')
        }).
        catch (function(reason) {
            console.log("there was an error!");
            throw reason
        })

    }

    function getUser() {
        return user
    }

    // The external API. Only functions so that we
    // can update internally after injection
    return {
        "getUser"      :  getUser,
        "login"        :  login,
    }
});
