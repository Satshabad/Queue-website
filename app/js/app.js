'use strict';


var app = angular.module('queueapp', ['ngResource', 'ngRoute', "foundation"])

app.config(function($routeProvider, $httpProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|spotify):/);

    $routeProvider.when('/queue', {
        templateUrl: 'partials/queue.html',
    }).when('/saved', {
        templateUrl: 'partials/saved.html',
    }).when('/sent', {
        templateUrl: 'partials/sent.html',
    }).when('/', {
        templateUrl: 'partials/login.html',
    })
})

app.run(function($rootScope, Facebook, User) {

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

});
