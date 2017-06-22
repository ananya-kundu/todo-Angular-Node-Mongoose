app.controller('collaboratorController', function($scope,$uibModalInstance,obj,mykeepService) {
  console.log("i'm col controller");
  console.log("col control",obj);

  // console.log("contr",object);
$scope.colSave = function () {
console.log("col controller",id);
var url="/logIn" ;

    var collaboratorObj={
      id: x.userid,
      col: "collaborator"
    }
  //  var url="/updateDatacard/" + id + "";

    var obj = mykeepService.app(url,collaboratorObj);
    obj.then(function(data) {
    console.log("fghjhjkjk",data);


    }).catch(function(error) {
        console.log("err");

    })
   $uibModalInstance.dismiss('Done');
  };
});
