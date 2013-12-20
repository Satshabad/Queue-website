'use strict';

angular.module('queueapp').
directive('modal', function (){
 return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        scope.$watch('currentItem', function(currentItem) {
          if (currentItem === undefined){
            $('#'+elem[0].id).foundation('reveal', 'close')
          } else {
            $('#'+elem[0].id).foundation('reveal', 'open')
            //$('.reveal-modal-bg').attr('ng-click', 'removeCurrentItem()');
          }

        })
      },
      replace: true,
      templateUrl:'partials/detailModal.html'
    }
});
