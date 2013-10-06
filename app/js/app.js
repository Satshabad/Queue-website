'use strict';


var app = angular.module('queueapp', ['ngResource', 'ngRoute', 'ui.bootstrap.modal', 'localytics.directives'])

app.config(function($routeProvider) {
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
