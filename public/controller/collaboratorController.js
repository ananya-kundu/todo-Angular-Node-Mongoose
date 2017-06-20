app.controller('collaboratorController', function($scope,$uibModalInstance,mykeepService) {
  // $scope.updated_title=object.title;
  // $scope.updated_note=object.note;
  // $scope.updated_date=object.updated;
  // $scope.updated_color=object.bgcolor;
  // $scope.id=object.id;


  // console.log("contr",object);
$scope.update = function (id) {
console.log(id);
console.log("title",$scope.updated_title);

    var updated_data={
      title:$scope.updated_title,
      take_note:$scope.updated_note,
      _id:id

    }
   var url="/updateDatacard/" + id + "";

    var obj = todo_service.App(url,updated_data,id);
    obj.then(function(data) {
      $scope.get_data();


    }).catch(function(error) {
        console.log("err");

    })
   $uibModalInstance.dismiss('Done');
  };
});
