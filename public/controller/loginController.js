// login Controller
/**
  * login Controller
  * it controls ogin
  * if login is successfull,then go to home page
  */
app.controller('loginController', function($scope,$location,$state,$auth,toastr,mykeepService) {

 /**
   * @param {String} user - user contain email and password
   * @return - success home page else login
   */
 var url="/session";
 var checkUser = mykeepService.app(url);

 checkUser.then(function(data) {
    console.log("before data checking",data);
    if(data.data.status == true){
          console.log("before dashboard");
            //  toastr.success('You have successfully signed in!');
            $state.go('dashboard');
    }else{
          //  toastr.error(error.data.msg, error.status);
           $state.go('login');
   }
 }).catch(function(error) {
       console.log(error);
 })


 /**
   * @function login - access the data after login
   * @param {String} user - user contain email and password
   * @return - success login status else error message
   */
 $scope.login = function() {                            //log() called in logIn.html
   var emailid = $scope.emailid;
   var password = $scope.password;

   var userLogin = {
     email: emailid,
     password: password
   }

   console.log(userLogin);
   var url="/logIn";
   console.log("log url",url);
   var userNewObj = mykeepService.app(url,userLogin);
   userNewObj.then(function(data) {
      //  console.log("logged data",data);
      if(data.data.status == true){
            $state.go('dashboard');
      }else{
         $state.go('login');
       }
   }).catch(function(error) {
     console.log(error);
   })
 }

 /*it is used for facebook login*/
 $scope.authenticate = function(provider) {
     $auth.authenticate(provider)
       .then(function() {
        //  toastr.error('You have successfully signed in with ');
         toastr.success('You have successfully logged-in with ' + provider + '!');
         $state.go('dashboard');
       })
       .catch(function(error) {
         if (error.message) {
           // Satellizer promise reject error.
           toastr.error(error.message);
         } else if (error.data) {
           // HTTP response error from server
           toastr.error(error.data.message, error.status);
          //  toastr.error(error);
         } else {
         }
       });
   };


});
