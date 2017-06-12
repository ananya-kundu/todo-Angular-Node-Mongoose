

var app = angular.module('myApp', ['ui.router','ngSanitize','ui.bootstrap','ui.bootstrap.datetimepicker','ngImgCrop']);
    // configure our routes
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
      .state('archive',{
          url:'/archive',
          templateUrl:'html/dashboard.html',
          controller:'archiveController',
          onEnter:function(){
            console.log("in archive");
          }
      })
      .state('reminder',{
          url:'/reminder',
          templateUrl:'html/dashboard.html',
          controller:'reminderController',
          onEnter:function(){
            console.log("in reminder");
          }
      })
        $urlRouterProvider.otherwise("/login");
    });


    // require('./directives/yep-nope.controller');
    // require('./services/github-status.service');
    // require('./controllers/dashboard.controller');

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
