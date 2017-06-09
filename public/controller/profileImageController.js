app.controller('profileImageController', function($scope,$rootScope,mykeepService,$uibModalInstance) {
  $scope.myImage='';
  $scope.myCroppedImage='';

  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };


$scope.profileImage=function(){
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
}



 $scope.saveProfileImage = function(img){
   $rootScope.img = img;
   console.log( $rootScope.userinfo.userName);
   var profileimgObj = {
     myImage :   $scope.myImage,
     myCroppedImage : $scope.myCroppedImage,
     name : $rootScope.userinfo.userName
   }
   var url = "http://localhost:8081/uploadprofileimage";

   var obj = mykeepService.app(url,profileimgObj);
   obj.then(function(data) {
    //  $scope.getmsgcard();
     // console.log(data.data.status);
   }).catch(function(error) {
       console.log("error1");
   });
  //  console.log(profileimgObj);
 }
 });
