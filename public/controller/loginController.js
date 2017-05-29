app.controller('loginController', function($scope,$location,$state,mykeepService) {
  console.log("cfdsfsdf");
  $scope.message = ' I am a login page.';
    var url="http://localhost:8081/session";
  var checkUser = mykeepService.app(url);
  checkUser.then(function(data) {
    if(data.data.status == true){
      // $location.path('/dashboard');
      $state.go('dashboard');
    }else{
        // $location.path('/login');
        $state.go('login');
    }
    // console.log(data);
  }).catch(function(error) {
    console.log(error);
  })


  $scope.login = function() {
    var emailid = $scope.emailid;
    var password = $scope.password;

    var userLogin = {
      email: emailid,
      password: password
    }

    console.log(userLogin);
    var url="http://localhost:8081/login";
    var userNewObj = mykeepService.app(url,userLogin);
    userNewObj.then(function(data) {
      if(data.data.status == true){
        // $location.path('/dashboard');
        $state.go('dashboard');
      }else{
          // $location.path('/login');
          $state.go('login');
      }
      console.log(data);
    }).catch(function(error) {
      console.log(error);
    })
  }

});


// app.service('loginservice', function($http) {
//   this.app = function() {
//     return $http({
//       url: "http://localhost:8081/session",
//       method: "POST",
//       data: userLogin
//     });
//   }
// });
