'use strict';


// Declare app level module which depends on filters, and services
angular.module('queue', ['queue.filters', 'queue.services', 'queue.directives', 'queue.controllers'])
  .run(function (Facebook) {
    window.fbAsyncInit = function () {
      FB.init({
            appId:'580401268636769',
            status:true,
            cookie:true,
            xfbml:true
      });

      Facebook.init(FB)

    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
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
