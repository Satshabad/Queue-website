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
			        	<img src="http://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Gold-on-the-ceiling.jpg/220px-Gold-on-the-ceiling.jpg" />\
			    		<table class="info">\
			        		<tr class="title"><td>Gold on the Ceiling</td></tr>\
			        		<tr class="subTitle"><td>The Black Keys</td></tr>\
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
