'use strict';

/* Directives */

angular.module('queueapp').
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);



angular.module('queueapp')
.directive('listItem', function () {
	return {
		restrict: 'E',
		template: '<div class="listItem">\
			        	<img src="http://cdn.gorillaz.com/the-fall/img/the_fall.jpg" />\
			    		<table class="info">\
			        		<tr class="title"><td>The Parish of Space Dust</td></tr>\
			        		<tr class="subTitle"><td>Gorillaz</td></tr>\
			    		</table>\
			    	</div>',
		replace: true,
		link: function (scope, elem, attrs) {
			elem.on('click', function (event) {
				elem.addClass('selected');
			})
		}
	}
})
