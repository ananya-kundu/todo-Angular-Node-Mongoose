
  // login Controller
app.controller('loginController', function($scope,$location,$state,mykeepService) {

  /**
    * @param {String} user - user contain email and password
    * @return - success home page else login
    */
  var url="http://localhost:8081/session";
  var checkUser = mykeepService.app(url);
  checkUser.then(function(data) {
    if(data.data.status == true){
      $state.go('dashboard');
    }else{
        // toastr.success('You have successfully signed in!');
        // $location.path('/login');
        $state.go('login');
    }
    // console.log(data);
  }).catch(function(error) {
        console.log(error);
  })

  /**
    * @function login - access the data after login
    * @param {String} user - user contain email and password
    * @return - success login status else error message
    */
  $scope.login = function() {
    var emailid = $scope.emailid;
    var password = $scope.password;

    var userLogin = {
      email: emailid,
      password: password
    }

    console.log(userLogin);
    var url="http://localhost:8081/logIn";
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
