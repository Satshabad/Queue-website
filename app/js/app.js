'use strict';


var app = angular.module('queueapp', ['ngResource', 'ngRoute'])

app.config(function($routeProvider) {
    $routeProvider.when('/queue', {
        templateUrl: 'partials/queue.html',
    }).when('/saved', {
        templateUrl: 'partials/saved.html',
    }).when('/sent', {
        templateUrl: 'partials/sent.html',
    })
})

app.run(function($rootScope, Facebook, User) {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '580401268636769',
            status: true,
            cookie: true,
            xfbml: true
        });

        Facebook.init(FB)
        User.login().then(function() {
            $rootScope.safeApply(function() {})
        })

    };

    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
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

});
