app.directive('newcontenteditable', function() {
  return {
      require: '?ngModel',
      scope: {
      },
      link: function(scope, element, attrs, ctrl) {
          // view -> model (when div gets blur update the view value of the model)
          element.bind('blur', function() {
              scope.$apply(function() {
                  ctrl.$setViewValue(element.html());
              });
          });
          // model -> view
          ctrl.$render = function() {
              element.html(ctrl.$viewValue);
          };
          // load init value from DOM
          ctrl.$render();
          // remove the attached events to element when destroying the scope
          scope.$on('$destroy', function() {
              element.unbind('blur');
              element.unbind('paste');
              element.unbind('focus');
          });
      }
  };
});

app.directive('testpackery', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // console.log("link called on", element[0]);
        if ($rootScope.packery === undefined || $rootScope.packery === null) {
          scope.element = element;
          $rootScope.packery = new Packery(element[0].parentElement, {
            isResizeBound: true,
            // rowHeight: 230,
            // columnWidth: 230,
            itemSelector: '.drag'
          });
          $rootScope.packery.bindResize();
          var draggable1 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable1);

          draggable1.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });

          $rootScope.packery.on('layoutComplete');
          $rootScope.packery.on('dragItemPositioned');
        }
        else {
          var draggable2 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable2);
          draggable2.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });

        }
        $timeout(function() {
          $rootScope.packery.reloadItems();
          $rootScope.packery.layout();
        }, 100);
      }
    };

  }
]);
