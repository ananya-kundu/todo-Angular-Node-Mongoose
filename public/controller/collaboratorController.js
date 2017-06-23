
/**
  * collaborator Controller
  * it controls changes of archivepage
  * show cards if card is archived
  */

app.controller('collaboratorController', function($scope,$uibModalInstance,obj,mykeepService) {
  //colSave is used for collaborator owner details saving purpose
    $scope.colSave = function () {
        console.log("col controller",id);
        var url = "/logIn" ;

        var collaboratorObj = {
              id: x.userid,
              col: "collaborator"
          }

          var obj = mykeepService.app(url,collaboratorObj);
          obj.then(function(data) {
                console.log("fghjhjkjk",data);
            }).catch(function(error) {
                    console.log("err");
                })
          $uibModalInstance.dismiss('Done');
      };

});





  // $scope.findCol = function (){
  //   console.log("findcol call");
  //   var url = "/findCollaborator";
   //
  //   var obj = mykeepService.app(url);
  //   obj.then(function(data) {
  //   console.log("find colllll",data);
   //
   //
  //   }).catch(function(error) {
  //       console.log("err");
   //
  //   })
  //  $uibModalInstance.dismiss('Done');
  // };
