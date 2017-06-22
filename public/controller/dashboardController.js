/**
 * home controller
 */

app.controller('dashboardController', function($scope,$state,$uibModal,$rootScope,$timeout,$auth,mykeepService) {

  $scope.tomorrow ="tomorrow";
  $scope.nextweek = "nextweek";
  $scope.today = "today";
  $scope.pinnote=true;
  $scope.normalnote=true;
  $scope.activenote=true;

  $scope.keep="My Keep";
  // $scope.archivenote = true;
  // $scope.remindernote = true;
  // $scope.trashsnote = true;
  // console.log('dashboard',);
  $scope.mainNote = true;
  $scope.takeclick = function(){
    $scope.mainNote = false;
    $scope.dummyNote = true;
  }
// console.log($scope.remindernote);

  $scope.color = [
    {
      "color" :"#fff",
      "path" : "../images/moonwhite.png",
      "tooltip" :"White",
    },
    {
      "color" :"#ff8a80",
      "path" : "../images/moonred.png",
      "tooltip" :"Red",
    },
    {
      "color" :"#ffd180",
      "path" : "../images/moonyellow.png",
      "tooltip" :"Orange",
    },
    {
      "color" :"#ffff8d",
      "path" : "../images/moonlyellow.png",
      "tooltip" :"Yellow",
    },
    {
      "color" :"#cfd8dc",
      "path" : "../images/moongrey.png",
      "tooltip" :"Gray",
    },
    {
      "color" :"#80f8ff",
      "path" : "../images/moonblue.png",
      "tooltip" :"Blue",
    },
    {
      "color" :"#ccff90",
      "path" : "../images/moongreen.png",
      "tooltip" :"Green",
    },
    {
      "color" :"#a7ffeb",
      "path" : "../images/moonaqua.png",
      "tooltip" :"Teal",
    }
  ]


  $scope.image = function() {
    var url = "http://localhost:8081/userprofile";
    console.log();
    var obj = mykeepService.app(url);
    mykeepService.app(url).then(function(data){

        $rootScope.userinfo = data.data.userinfo ;
        $rootScope.userName = data.data.userinfo.local.userName; //fetching userName by local schema
        // console.log("inside image");
        console.log("user",$rootScope.userName);
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
    this.cancel = function(){
          // console.log("updation cancelled");
          $uibModalInstance.dismiss('cancel');
    };
};


/**
   * @function Todo - get all cards
   * @param {String} cards - contain cards
   * @return - success status return the todos else error message
   */
// controller for get card
$scope.getmsgcard = function() {
    var url = "http://localhost:8081/getMsgCard";
    var obj = mykeepService.app(url);
    obj.then(function(data) {
        if(data.data.status == true){
            var arrNote = [];
            // console.log( data.data.message.length );
            for (var i = data.data.message.length - 1; i >= 0; i--) {
                arrNote[arrNote.length] = data.data.message[i];
              }
              // console.log(arrNote);
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
      $scope.mainNote = true;
      $scope.dummyNote = false;
      var title = $scope.title;
      var note = $scope.note;
      $scope.title = null;
      $scope.note = null;

      var object = {
            title1: title,
            content: note
          }

      if (title == "" && note == "" || title == undefined && note == undefined || title == null && note == null){
          return;
        }

      var url = "http://localhost:8081/createCards";

      var obj = mykeepService.app(url,object);
      obj.then(function(data) {
          $scope.getmsgcard();
          // console.log(data.data.status);
        }).catch(function(error) {
            console.log("error1");
          });
          $scope.getmsgcard();
  }//end of savemsgcard()

  $scope.gridview = function() {
    // console.log("gridview");
    $scope.gridlist="gridviewnew";
    $scope.innote = "col-xs-12 col-sm-12 col-md-6 col-lg-3 drag gridcss";
    $scope.showpreid="preid cardhover";

    $scope.gridstyle = {
      'display':'none'
    }
    $scope.liststyle = {
      'display':'block'
    }
    localStorage.setItem("view","grid");
  }

  $scope.listview = function() {
    // console.log("listview");
    $scope.gridlist="gridviewnew";
    $scope.innote = "col-sm-12 col-lg-12 col-md-12 col-xs-12 drag listcss";
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
    // console.log("grid");
    $scope.gridview();
  }else{
    // console.log("list");
    $scope.listview();
  }


  /**
       * @function deleteCards - delete cards
       * @param {String} cards - contain cards
       * @return - success status return  else error message
       */
// controller for delete card
  $scope.deletecards = function(cardsid,del) {
    var delObj = {
      del: del
    }
      var url = "http://localhost:8081/deleteMsgCard/" + cardsid + "";
      mykeepService.app(url,delObj).then(function(data){
            $scope.getmsgcard();
          }).catch(function(error){
                console.log(error);
              })
  }

$scope.refresh = function(){
  $route.getmsgcard();
}




/**
     * @function popup - create popup modal
     * @param {String} cards - contain cards detail
     */


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
                        // console.log("inside updation");
                        updateNote = {
                            title1 : this.title1,
                            content : this.content,
                            updated_at : this.updated_at
                          }
                          // console.log(updateNote);
                        var url ="http://localhost:8081/updateMsgCards/" + this.id + "";
                        var obj = mykeepService.app(url,updateNote);

                        obj.then(function(data){
                            // console.log("updated");
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
                        // console.log("updation cancelled");
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
    }//popup close


    /**
         * @function collaborator - create collaborator modal
         * @param {String} User - contain user
         */

    $scope.collaborator = function(x){
      object = {
          id: x.userid,
          col: 'collaborator'
        }
        // console.log(updateNote);
     var url="http://localhost:8081/logIn";
      var obj = mykeepService.app(url,object);
      console.log("url nd obj passed",obj);
      obj.then(function(data){
          console.log("uyuioyuiyuioiopui",data.data.message);
            $rootScope.displayName = data.data.message.displayName;
          $rootScope.email = data.data.message.googleEmail;
          console.log("cghjhjh",$scope.email);
          console.log("cghjhjh",$scope.displayName);


          var modalInstance = $uibModal.open({
                  templateUrl : "../html/collaborator.html",
                  controller : function($uibModalInstance){
                        var $ctrl = this;

                        this.colSave = function(){
                            // console.log("inside updation");

                        };

                        this.cancel = function(){
                            // console.log("updation cancelled");
                            $uibModalInstance.dismiss('cancel');
                          };
                },
                controllerAs : "$ctrl"
              });
            // }
      }).catch(function(error){
              console.log(error);
        })

      };



      // console.log("in function cols",x);
      //
      //   var modalInstance = $uibModal.open({
      //           tem



    /**
         * @function createreminder - create reminder
         * @param {String} remDate - contain reminder date
         */

  $scope.createReminder = function(cardsid,day) {
          // console.log(cardsid);
          $scope.day = day;
          var remDate = new Date();

          if ($scope.day == "today") {
              var today = new Date();
              remDate.setHours(20, 0, 0);
              $scope.day=  new Date(today);
              // console.log("today",day);
          } else if ($scope.day == "tomorrow") {
                var tomorrow = new Date(remDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                $scope.day = new Date(tomorrow);
              // console.log(day);
            } else if ($scope.day == "nextweek") {
                  // console.log("nextweek");
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
                            // console.log("updated");
                            $scope.getmsgcard();
                          }else{
                            console.log("not updated");
                          }
                        }).catch(function(error){
                                console.log(error);
                              })
      };

      /**
           * @function deleteReminder - delete reminder
           * @param {String} remDate - contain reminder date
           */

      $scope.deleteReminder = function(cardsid) {
              var url = "http://localhost:8081/reminderDelete/" + cardsid + "";
              mykeepService.app(url).then(function(data){
                // console.log(data);
                $scope.getmsgcard();
        }).catch(function (error) {
              console.log(error);
            })
      };


      /**
           * @function cardCopy - copy the card
           * @param {String} cards - contain card details
           */
      $scope.cardCopy = function(notedata){
            var url = "http://localhost:8081/createCards";
            var obj = mykeepService.app(url,notedata);
            obj.then(function(data) {
                $scope.getmsgcard();
              }).catch(function(error) {
                  // console.log("error1");
                });
      }

      /**
           * @function changeColor - contain color
           * @param {String} color_data - contain color data
           */
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

  /**
       * @function pinup - contain cards
       * @param {String} cards - contain object of cards(pin and archive value contain)
       */
  $scope.pinup = function(cardsid,pin,archive){
      var url = "http://localhost:8081/pinUp/" + cardsid + "";
      var object = {
        pin: pin,
        archive:archive
      }
      console.log("pinned",object);
      mykeepService.app(url,object).then(function(data){
        $scope.getmsgcard();
      }).catch(function(error){
        console.log(error);
      });
    }

    /**
         * @function archive - contain cards
         * @param {String} cards - contain object of cards(pin and archive value contain)
         */
    $scope.archive = function(cardsid,archive,pin){
      var url = "http://localhost:8081/archive/" + cardsid + "";
      var object = {
        pin: pin,
        archive:archive
      }
      mykeepService.app(url,object).then(function(data){
        $scope.getmsgcard();
      }).catch(function(error){
        console.log(error);
      });
    }

    /**
     * logout controller
     */
  $scope.logOut = function(){
    var url = "http://localhost:8081/logOut";
    mykeepService.app(url).then(function(data){

    }).catch(function(error){
      console.log(error);
    });

    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        // toastr.info('You have been logged out');
        $state.go('/');
      });


  }


});
