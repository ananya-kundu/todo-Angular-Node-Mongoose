app.controller('dashboardController', function($scope,$state,$uibModal,$rootScope,$timeout,mykeepService) {
  console.log("ghsjh");
  console.log($scope);

  $scope.tomorrow ="tomorrow";
  $scope.nextweek = "nextweek";
  $scope.today = "today";

  $scope.mainNote=true;
  $scope.takeclick=function(){
    $scope.mainNote=false;
    $scope.dummyNote=true;
  }

  $scope.color = [
    {
      "color" :"#fff",
      "path" : "../images/moonwhite.png"
    },
    {
      "color" :"#ff8a80",
      "path" : "../images/moonred.png"
    },
    {
      "color" :"#ffd180",
      "path" : "../images/moonyellow.png"
    },
    {
      "color" :"#ffff8d",
      "path" : "../images/moonlyellow.png"
    },
    {
      "color" :"#cfd8dc",
      "path" : "../images/moongrey.png"
    },
    {
      "color" :"#80f8ff",
      "path" : "../images/moonblue.png"
    },
    {
      "color" :"#ccff90",
      "path" : "../images/moongreen.png"
    },
    {
      "color" :"#a7ffeb",
      "path" : "../images/moonaqua.png"
    }
  ]
  $scope.image = function() {
    var url = "http://localhost:8081/readuserprofile";
    console.log();
    var obj = mykeepService.app(url);
    mykeepService.app(url).then(function(data){
      console.log(data.data.userinfo);
      $scope.userinfo = data.data.userinfo ;
       console.log("inside image");

     }).catch(function(error){
       console.log(error);
     })

  };
  $scope.image();

$scope.changeProfileImage = function() {
  var modalInstance = $uibModal.open({
    templateUrl : "../html/profileImage.html",
    controller : "profileImageController",
    resolve:{
    }
  });
    modalInstance.result.catch(function(error){
          console.log("error",error);
        });

};


// controller for get card
  $scope.getmsgcard = function() {
    var url = "http://localhost:8081/getMsgCard";
    var obj = mykeepService.app(url);
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
  // controller for create card
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

    if (title==""&& note=="" || title==undefined && note==undefined || title==null && note==null){
      return;
    }

    var url = "http://localhost:8081/createcards";

    var obj = mykeepService.app(url,object);
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
    // $scope.list = false;
    // $scope.grid = true;
    $scope.gridlist="gridviewnew";
    $scope.innote = "col-xs-12 col-sm-4 col-md-4 col-lg-3 drag";
    $scope.showpreid="preid cardhover";
    // col-lg-4 col-md-6 col-sm-6 col-xs-12 cardhover";
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
    // $scope.list = true;
    // $scope.grid = false;
    $scope.gridlist="gridviewnew";
    $scope.innote = "col-sm-12 col-lg-10 col-md-12 col-xs-11 drag";
    $scope.showpreid="preid1 cardhover";
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

// controller for delete card
  $scope.deletecards = function(cardsid) {
      var url = "http://localhost:8081/deletemsgcard/" + cardsid + "";
   mykeepService.app(url).then(function(data){
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
        this.created_at = datanote.created_at;
        this.updated_at = datanote.updated_at;
        this.color = datanote.color;

        this.updateCard = function(){
          console.log("inside updation");
          updateNote = {
            title1 : this.title1,
            content : this.content,
            updated_at : this.updated_at
          }
          console.log(updateNote);
          var url ="http://localhost:8081/updatemsgcards/" + this.id + "";
          var obj = mykeepService.app(url,updateNote);
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


  $scope.createReminder = function(cardsid,day) {
          console.log(cardsid);
          $scope.day = day;
          var remDate = new Date();

          if ($scope.day == "today") {
            var today = new Date();
              remDate.setHours(20, 0, 0);
              $scope.day=  new Date(today);
              console.log("today",day);

          } else if ($scope.day == "tomorrow") {
              var tomorrow = new Date(remDate);
              tomorrow.setDate(tomorrow.getDate() + 1);
              // remDate.setHours(8, 0, 0);
              $scope.day = new Date(tomorrow);
              console.log(day);

          } else if ($scope.day == "nextweek") {
            console.log("nextweek");
            var nextweek = new Date(remDate);

              nextweek.setDate(nextweek.getDate() + 7);
              $scope.day = new Date(nextweek);
          }
          else {
            $scope.day = new Date(day);
          }
          var remDay = {
              reminder : $scope.day
          }
          var url = "http://localhost:8081/reminder/" + cardsid + "";
          var obj = mykeepService.app(url,remDay );

          obj.then(function(data){
            if(data.data.status == true){
              console.log("updated");
              $scope.getmsgcard();
            }else{
              console.log("not updated");
            }
          }).catch(function(error){
            console.log(error);
          })

      };
      $scope.deleteReminder = function(cardsid) {
        var url = "http://localhost:8081/reminderdelete/" + cardsid + "";
        mykeepService.app(url).then(function(data){
            console.log(data);
            $scope.getmsgcard();

        }).catch(function (error) {
      console.log(error);

        })
         };


$scope.cardCopy = function(notedata){
var url = "http://localhost:8081/createcards";

// console.log("SAdSADSAd");
var obj = mykeepService.app(url,notedata);
obj.then(function(data) {
  $scope.getmsgcard();
}).catch(function(error) {
    console.log("error1");
  });
}


  $scope.changeColor = function(color,cardsid){
    var color_data={
      color:color
    }
    var url = "http://localhost:8081/color/" + cardsid + "";
    mykeepService.app(url,color_data).then(function(data){
      $scope.getmsgcard();
    }).catch(function(error){
      console.log(error);
    });
  }


  $scope.logOut = function(){
    var url = "http://localhost:8081/logout";
    mykeepService.app(url).then(function(data){

    }).catch(function(error){
      console.log(error);
    });
  }







});
