app.controller('dashboardController', function($scope,$state,$uibModal,$rootScope,savemsgcardService, getmsgcardService,deletecardService,updatemsgcardService) {
  console.log("ghsjh");
  console.log($scope);
  // $scope.message = 'hi...welcome to front page!';
  $scope.mainNote=true;
  $scope.takeclick=function(){
    $scope.mainNote=false;
    $scope.dummyNote=true;
  }
  $scope.getmsgcard = function() {
    var obj = getmsgcardService.app();
    obj.then(function(data) {
      if(data.data.status == true){
        var arrNote = [];
        console.log( data.data.message.length );
        for (var i = data.data.message.length - 1; i >= 0; i--) {
          arrNote[arrNote.length] = data.data.message[i];
        }
        console.log(arrNote);
        $scope.message = arrNote;
      }else{
        console.log(data.data.message);
      }

      $scope.message = arrNote;
    }).catch(function(error) {
      console.log("error");
    });
  }
  $scope.getmsgcard();

  $scope.savemsgcard = function() {
    $scope.mainNote=true;
    $scope.dummyNote=false;

    var title = $scope.title;
    var note = $scope.note;
    $scope.title=null;
    $scope.note=null;
    console.log("kfjskafj");
    console.log(title);
    console.log(note);

    var object = {
      title1: title,
      content: note
    }
    if (title==""&& note=="" || title==undefined && note==undefined ){
      return;
    }
    var obj = savemsgcardService.app(object);
    obj.then(function(data) {
      $scope.getmsgcard();
      // console.log(data.data.status);
    }).catch(function(error) {
        console.log("error1");
    });
    $scope.getmsgcard();
  }
  $scope.gridview = function() {
    console.log("gridview");
    $scope.list = false;
    $scope.grid = true;
    $scope.gridstyle = {
      'display':'none'
    }
    $scope.liststyle = {
      'display':'block'
    }
    localStorage.setItem("view","grid");
  }

  $scope.listview = function() {
    console.log("listview");

    $scope.list = true;
    $scope.grid = false;
    $scope.liststyle = {
      'display':'none'
    }
    $scope.gridstyle = {
      'display':'block'
    }
    localStorage.setItem("view","list");
  }
if(localStorage.getItem("view") == "grid"){
  console.log("grid");
  $scope.gridview();
}else{
  console.log("list");
  $scope.listview();
}


  $scope.deletecards = function(cardsid) {
   deletecardService.app(cardsid).then(function(data){
      console.log("inside del");
      $scope.getmsgcard();
    }).catch(function(error){
      console.log(error);
    })

  }
  $scope.popup = function(datanote){
    var modalInstance = $uibModal.open({
      templateUrl : "../html/popup.html",
      controller : function($uibModalInstance){
        var $ctrl = this;
        this.id = datanote._id;
        this.title1 = datanote.title1;
        this.content = datanote.content;

        this.updateCard = function(){
          console.log("inside updation");
          updateNote = {
            title1 : this.title1,
            content : this.content
          }
var obj = updatemsgcardService.app(updateNote,this.id);
obj.then(function(data){
  console.log("updated");
  if(data.data.status == true){
    $scope.getmsgcard();
  }else{
    console.log("not updated");
  }
}).catch(function(error){
  console.log(error);
})

        };
this.cancel = function(){
  console.log("updation cancelled");
  $uibModalInstance.dismiss('cancel');
};
},
controllerAs : "$ctrl"
});

modalInstance.result.catch(function(error){
  console.log("error",error);
}).then(function(data){
  if(data){
    console.log(data);
  }
});
}

});
app.service('savemsgcardService', function($http) {
  this.app = function(object) {
    return $http({
      url: "http://localhost:8081/createcards",
      method: "POST",
      data: object
    });
  }
});
app.service('getmsgcardService', function($http) {
  this.app = function() {
    return $http({
      url: "http://localhost:8081/pinup",
      method: "GET",
      // data: object
    });
  }
});
app.service('deletecardService', function($http) {
  this.app = function(cardsid) {
    return $http({
      url: "http://localhost:8081/deletemsgcard/" + cardsid + "",
      method: "DELETE",
    });
  }
});
app.service('updatemsgcardService', function($http) {
  this.app = function(data,cardsid) {
    return $http({
      url: "http://localhost:8081/updatemsgcards/" + cardsid + "",
      method: "POST",
      data : data
    });
  }
});
