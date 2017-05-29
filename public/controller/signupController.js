// app.controller('signupController', function($scope) {
//     $scope.message = 'Contact us! ';
// });


app.controller('signupController', function($scope,$state,$location,mykeepService) {
  console.log("signup page");
  $scope.message = ' I am a signup page.';

  $scope.signupbtn = function() {
    var userName = $scope.userName;
    var mobileNo = $scope.mobileNo;
    var emailid = $scope.emailid;
    var password = $scope.password;

    var userObj = {
      userName : userName,
      mobileNo : mobileNo,
      email: emailid,
      password: password
    }
    var url= "http://localhost:8081/signup";
    console.log(userObj);
    var signupObj = mykeepService.app(url,userObj);
    signupObj.then(function(data) {
      if(data.data.status == true){
        $state.go('login');
      }else{
          $state.go('signup');
      }
      console.log(data);
    }).catch(function(error) {
      console.log(error);
    })
  }

});
