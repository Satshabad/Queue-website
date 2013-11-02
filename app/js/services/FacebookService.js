'use scrict';

// The Facebook service. It's a thin wrapper on the FBAPI library
angular.module('queueapp').
factory('Facebook', function($q, $rootScope) {
    var FBAPI;

    function init(facebookLibrary) {
        if (FBAPI !== undefined) {
            return $q.when()
        }

        var deferred = $q.defer();
        window.fbAsyncInit = function() {
            FB.init({
                appId: $rootScope.config['appId'],
                status: true,
                cookie: true,
                xfbml: true
            });

            FBAPI = FB;

            $rootScope.safeApply(function() {
                deferred.resolve()
            });
        };

        (function(d) {
            var js, id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

        return deferred.promise;

    }

    function login() {
        return init().then(function() {

            var deferred = $q.defer();

            FBAPI.login(function(response) {
                $rootScope.safeApply(function() {
                    if (response.status === 'connected') {

                        $rootScope.safeApply(function() {
                            deferred.resolve(response.authResponse)
                        });
                    } else {
                        deferred.reject("could not login");
                    }
                });
            });

            return deferred.promise;
        })

    }

    function api(path) {
        return init().then(function() {
            var deferred = $q.defer();

            FBAPI.api(path, function(response) {
                $rootScope.safeApply(function() {
                    deferred.resolve(response)
                });

            });

            return deferred.promise;
        })
    }

    function getLoginStatus() {
        return init().then(function() {

            var deferred = $q.defer();

            FBAPI.getLoginStatus(function(response) {

                $rootScope.safeApply(function() {

                    $rootScope.safeApply(function() {
                        deferred.resolve(response)
                    });
                });

            });

            return deferred.promise
        })

    }

    return {
        getLoginStatus: getLoginStatus,
        login: login,
        api: api
    }

});
