
//profileImage Controller

app.controller('profileImageController', function($scope,$rootScope,mykeepService,$uibModalInstance) {
        $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage = evt.target.result;
              });
            };
            reader.readAsDataURL(file);
          };

        $scope.profileImage=function(){
                angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }

        /**
          * @function saveProfileImage - access the data after login
          * @param {String} saveProfileImage - user contain image,cropped image and name
          * @return - success set profile image else error message
          */
        $scope.saveProfileImage = function(img){
              $rootScope.img = img;
               console.log( $rootScope.userinfo);
              var profileimgObj = {
                  myImage :   $scope.myImage,
                  myCroppedImage : $scope.myCroppedImage,
                  name : $rootScope.userName
                }
                console.log("profile image",profileimgObj);
                var url = "http://localhost:8081/uploadProfileImage";

                var obj = mykeepService.app(url,profileimgObj);
                obj.then(function(data) {
                    // console.log(data.data.status);
                    
                  }).catch(function(error) {
                        console.log("error1");
                      });
        }
 });




 // app.controller('profileImageController', function($scope,$rootScope,mykeepService,$uibModalInstance) {
 //         $scope.myImage='';
 //         $scope.myCroppedImage='';
 //
 //         var handleFileSelect=function(evt) {
 //             var file=evt.currentTarget.files[0];
 //             var reader = new FileReader();
 //             reader.onload = function (evt) {
 //                 $scope.$apply(function($scope){
 //                     $scope.myImage=evt.target.result;
 //               });
 //             };
 //             reader.readAsDataURL(file);
 //           };
 //
 //         $scope.profileImage=function(){
 //                 angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
 //         }
 //
 //
 //         $scope.saveProfileImage = function(img){
 //               $rootScope.img = img;
 //                console.log( $rootScope.userinfo);
 //               var profileimgObj = {
 //                   myImage :   $scope.myImage,
 //                   myCroppedImage : $scope.myCroppedImage,
 //                   name : $rootScope.userinfo.userName
 //                 }
 //                 var url = "http://localhost:8081/uploadProfileImage";
 //
 //                 var obj = mykeepService.app(url,profileimgObj);
 //                 obj.then(function(data) {
 //                     // console.log(data.data.status);
 //                   }).catch(function(error) {
 //                         console.log("error1");
 //                       });
 //         }
 //  });
