app.controller('loginController', function($scope,$location,loginservice) {
  console.log("cfdsfsdf");
  $scope.message = ' I am a login page.';

  $scope.login = function() {
    var emailid = $scope.emailid;
    var password = $scope.password;

    var userLogin = {
      email: emailid,
      password: password
    }

    console.log(userLogin);
    var userNewObj = loginservice.app(userLogin);
    userNewObj.then(function(data) {
      if(data.data.status == true){
        $location.path('/dashboard');
      }else{
          $location.path('/login');
      }
      console.log(data);
    }).catch(function(error) {
      console.log(error);
    })
  }

});
app.service('loginservice', function($http) {
  this.app = function(userLogin) {
    return $http({
      url: "http://localhost:8081/login",
      method: "POST",
      data: userLogin
    });
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
