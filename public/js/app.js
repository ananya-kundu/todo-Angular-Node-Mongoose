

var app = angular.module('myApp', ['ui.router','ngSanitize','ui.bootstrap']);
    // configure our routes
// ,'ui.bootstrap'
    app.config(function($stateProvider,$urlRouterProvider) {

      $stateProvider.state('home',{
          url:'/',
          templateUrl:'html/login.html',
          controller:'loginController',
          onEnter:function(){
            console.log("in default");
          }
      })
      .state('login',{
          url:'/login',
          templateUrl:'html/login.html',
          controller:'loginController',
          onEnter:function(){
            console.log("in login");
          }
      })
      .state('signup',{
          url:'/signup',
          templateUrl:'html/signup.html',
          controller:'signupController',
          onEnter:function(){
            console.log("in signup");
          }
      })
      .state('dashboard',{
          url:'/dashboard',
          templateUrl:'html/dashboard.html',
          controller:'dashboardController',
          onEnter:function(){
            console.log("in dashboard");
          }
      })

        $urlRouterProvider.otherwise("/login");
    });

  //   app.directive('newcontenteditable', function() {
  //     return {
  //         require: '?ngModel',
  //         scope: {
  //         },
  //         link: function(scope, element, attrs, ctrl) {
  //             // view -> model (when div gets blur update the view value of the model)
  //             element.bind('blur', function() {
  //                 scope.$apply(function() {
  //                     ctrl.$setViewValue(element.html());
  //                 });
  //             });
  //             // model -> view
  //             ctrl.$render = function() {
  //                 element.html(ctrl.$viewValue);
  //             };
  //             // load init value from DOM
  //             ctrl.$render();
  //             // remove the attached events to element when destroying the scope
  //             scope.$on('$destroy', function() {
  //                 element.unbind('blur');
  //                 element.unbind('paste');
  //                 element.unbind('focus');
  //             });
  //         }
  //     };
  // });
  //



  // var app = angular.module('myApp', ['ngRouter','ngSanitize']);
  //     // configure our routes
  //
  //     app.config(function($routeProvider) {
  //
  //         $routeProvider
  //
  //             // route for the home page
  //             .when('/', {
  //                 templateUrl : 'html/login.html',
  //                 controller  : 'loginController'
  //             })
  //
  //             // route for the about page
  //             .when('/login', {
  //                 templateUrl : 'html/login.html',
  //                 controller  : 'loginController'
  //             })
  //
  //             // route for the contact page
  //             .when('/signup', {
  //                 templateUrl : 'html/signup.html',
  //                 controller  : 'signupController'
  //             })
  //             .when('/dashboard', {
  //                 templateUrl : 'html/dashboard.html',
  //                 controller  : 'dashboardController'
  //             })
  //             .otherwise({redirectTo : "/"});
  //     });
  //
