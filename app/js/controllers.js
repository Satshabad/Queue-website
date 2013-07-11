'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('FacebookCtrl', function($rootScope) {

    $rootScope.$on('facebookAuthChange', function(event, args){
      var status = args.response.status




    });

  });
