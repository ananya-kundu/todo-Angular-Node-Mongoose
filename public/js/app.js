var app = angular.module('myApp', ['ngRoute','ngSanitize']);
    // configure our routes

    app.config(function($routeProvider) {

        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'html/login.html',
                controller  : 'loginController'
            })

            // route for the about page
            .when('/login', {
                templateUrl : 'html/login.html',
                controller  : 'loginController'
            })

            // route for the contact page
            .when('/signup', {
                templateUrl : 'html/signup.html',
                controller  : 'signupController'
            })
            .when('/dashboard', {
                templateUrl : 'html/dashboard.html',
                controller  : 'dashboardController'
            })
            .otherwise({redirectTo : "/"});
    });

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





    // create the controller and inject Angular's $scope
    // app.controller('mainController', function($scope) {
    //     $scope.message = 'hi...welcome to front page!';
    // });
    //
    // app.controller('aboutController', function($scope) {
    //     $scope.message = 'Look! I am an about page.';
    // });
    //
    // app.controller('contactController', function($scope) {
    //     $scope.message = 'Contact us! ';
    // });
