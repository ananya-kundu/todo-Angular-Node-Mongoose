var app = angular.module('myApp', ['ui.router','ngSanitize','ui.bootstrap','ui.bootstrap.datetimepicker','ngImgCrop','satellizer']);
    // configure our routes
    app.config(function($stateProvider,$urlRouterProvider,$authProvider) {
        $urlRouterProvider.otherwise("/login");

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
      .state('trash',{
          url:'/trash',
          templateUrl:'html/dashboard.html',
          controller:'trashController',
          onEnter:function(){
            console.log("in trash");
          }
      })
        $authProvider.facebook({
            clientId: '1643439169007876'
          });
        $authProvider.google({
              clientId: '60233756870-pcb147tb6egsmac0d1uju3sl0tupct43.apps.googleusercontent.com'
            });

    });
