'use strict';

/* Services */

angular.module('queueapp').

// The service for all user interactions
factory('User', function(Facebook, $q, $http, $resource, config, $rootScope) {
    var user = {};
    var isLoggedBool = false;

    function login() {
        return Facebook.login().then(function(loginStatus) {
            user.accessToken = loginStatus.accessToken;
            user.facebookID = loginStatus.userID

            var tryToGetMe = Facebook.api('/me'),
                tryToGetPic = Facebook.api('/me/picture');

            return $q.all([tryToGetMe, tryToGetPic])

        }).then(_loginOnServer).
        then(_processLoginResp).
        catch (function(reason) {
            throw reason;
        })

    }

    function _processLoginResp(response) {
        user.id = response.data.userID
        isLoggedBool = true;
        $rootScope.$broadcast('login')
    }

    function _loginOnServer(results) {

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

        return $http.post('http://'+config['hostname']+'/login', postParams)

    }

    function softLogin() {
        return Facebook.getLoginStatus().then(function(response) {
            if (response.status === "connected") {

                user.accessToken = response.authResponse.accessToken;
                user.facebookID = response.authResponse.userID

                var tryToGetMe = Facebook.api('/me'),
                    tryToGetPic = Facebook.api('/me/picture');

                return $q.all([tryToGetMe, tryToGetPic])

            } else {
                throw "not connected yet"
            }
        }).then(_loginOnServer).
        then(_processLoginResp).
        catch (function(reason) {
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
        return $http.put('http://'+config['hostname']+'/user/' + user.id.toString(), user)
    }

    // The external API. Only functions so that we
    // can update internally after injection
    return {
        "softLogin"     :  softLogin,
        "setLastFMName" :  setLastFMName,
        "isLoggedIn"    :  isLoggedIn,
        "getUser"       :  getUser,
        "login"         :  login,
    }
});
