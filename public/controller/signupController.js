
/**
 * signup controller
 */
 /**
 * @function signup - signup the user
 * @param {String} user - user contain userName , mobileNo , emailid and password
 * @return - success signup status else error message
 */

app.controller('signupController', function($scope,$state,$location,toastr,mykeepService) {

  $scope.signupbtn = function() {
    var userName = $scope.userName;
    var mobileNo = $scope.mobileNo;
    var emailid = $scope.emailid;
    var password = $scope.password;

    var userObj = {
      userName : userName,
      mobileNo : mobileNo,
      email : emailid,
      password  : password
    }
    var url= "http://localhost:8081/signUp";
    // console.log(userObj);
    var signupObj = mykeepService.app(url,userObj);

    signupObj.then(function(data) {
      if(data.data.status == true){
        toastr.success('Registration successfully');
        // alert("user register successfully");
        $state.go('login');
      }else{
        // toastr.error('Registration Unsuccessfull,Please provide valid information','Error');
          alert("Inavlid data....fill the correct info");
          $state.go('signup');
      }

    }).catch(function(error) {
          console.log(error);
    })
  }

});
