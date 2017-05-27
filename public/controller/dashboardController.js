app.controller('dashboardController', function($scope,$state,$uibModal,$rootScope,savemsgcardService,getmsgcardService,deletecardService,updatemsgcardService,reminderService,reminderDeleteService,changeColorService) {
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


  $scope.changeColor = function(color,cardsid){
    // colorArr = ["#3498db","#f1c40f","#1abc9c","#95a5a6","#9b59b6"];
    // console.log("hohihui");
    // var newColor = colorArr[colorindex];
    changeColorService.app(color,cardsid).then(function(data){
      $scope.getmsgcard();
    }).catch(function(error){
      console.log(error);
    });
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

    if (title==""&& note=="" || title==undefined && note==undefined || title==null && note==null){
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
        this.created_at = datanote.created_at;
        this.updated_at = datanote.updated_at;


        this.updateCard = function(){
          console.log("inside updation");
          updateNote = {
            title1 : this.title1,
            content : this.content,
            updated_at : this.updated_at
          }
          console.log(updateNote);
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


  $scope.createReminder = function(cardsid,day) {
          // console.log(day);
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

              // this.updateReminder(remDate, t_id);
          }
          else {
            console.log("else");
              // this.updateRemilonder(day, t_id);
          }
          var remDay = {
              reminder : $scope.day
          }
          // var obj = reminderService.app(updateNote,this.id);
          var obj = reminderService.app(cardsid,remDay );

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
        reminderDeleteService.app(cardsid).then(function(data){
            console.log(data);
            $scope.getmsgcard();

        }).catch(function (error) {
      console.log(error);

        })
         };

$scope.cardCopy = function(notedata){

var obj = savemsgcardService.app(notedata);
obj.then(function(data) {
  $scope.getmsgcard();
  // console.log(data.data.status);
}).catch(function(error) {
    console.log("error1");
});
// $scope.getmsgcard();
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
app.service('reminderService', function($http) {
  this.app = function(cardsid,data) {
    console.log("i'm reminder service");
    return $http({
      url: "http://localhost:8081/reminder/" + cardsid + "",
      method: "POST",
      data : data
    });
  }
});
app.service('reminderDeleteService', function($http) {
  this.app = function(cardsid) {
    return $http({
      url: "http://localhost:8081/reminderdelete/" + cardsid + "",
      method: "DELETE",
    });
  }
});

app.service('changeColorService', function($http) {
  this.app = function(color,cardsid) {
    var colorObj = {
      color : color
    }
    console.log("i'm changecolor service");
    return $http({
      url: "http://localhost:8081/color/" + cardsid + "",
      method: "POST",
      data : colorObj
    });
  }
});




// $scope.createReminder = function(day, _id) {
//         console.log(day);
//         console.log(t_id);
//         var remDate = new Date();
//         if (day == "today") {
//             remDate.setHours(20, 0, 0);
//             // console.log(remDate);
//             this.updateReminder(remDate, t_id);
//         } else if (day == "tomorrow") {
//             remDate.setDate(remDate.getDate() + 1);
//             remDate.setHours(8, 0, 0);
//             // console.log(remDate);
//             this.updateReminder(remDate, t_id);
//         } else if (day == "nextweek") {
//             remDate.setDate(remDate.getDate() + 7);
//             // console.log(remDate);
//             this.updateReminder(remDate, t_id);
//         } else {
//             // console.log(remDate);
//             // console.log(day);
//             this.updateReminder(day, t_id);
//         }
//     };

//
//     // update reminder
//     $scope.updateReminder = function(remDate, t_id) {
//         console.log(t_id);
//         console.log(remDate);
//         $scope.reminder = {
//             reminder: remDate
//         };
//         //post call for update reminder
//         $http.post('/todo/updateTodo/' + t_id, $scope.reminder, {
//                 headers: {
//                     "x-access-token": $auth.getToken
//                 }
//             })
//             .then(function(data) {
//                 $scope.todo = data.data;
//                 toastr.success('Reminder updated successfully');
//                 //console.log(data);
//             })
//             .catch(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };
//
//
//     //  delete reminder
//     $scope.deleteReminder = function(t_id) {
//         // console.log(t_id);
//         $scope.reminder = {
//             reminder: ""
//         };
//         //post call for delete reminder
//         $http.post('/todo/updateTodo/' + t_id, $scope.reminder, {
//                 headers: {
//                     "x-access-token": $auth.getToken
//                 }
//             })
//             .then(function(data) {
//                 $scope.todo = data.data;
//                 toastr.success('Reminder deleted successfully');
//                 //console.log(data);
//             })
//             .catch(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };
