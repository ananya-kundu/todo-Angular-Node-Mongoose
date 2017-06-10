app.controller('loginController', function($scope,$location,$state,mykeepService) {
  // console.log("loginController");
  var url="http://localhost:8081/session";
  var checkUser = mykeepService.app(url);
  checkUser.then(function(data) {
    if(data.data.status == true){
      // console.log(data);
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
      // console.log(data);
    }).catch(function(error) {
      console.log(error);
    })
  }

});
