/**
 * home controller
 */

app.controller('dashboardController', function($scope, $state, $uibModal, $rootScope, $timeout, $auth, toastr, mykeepService) {

  $scope.tomorrow = "tomorrow";
  $scope.nextweek = "nextweek";
  $scope.today = "today";
  $scope.pinnote = true;
  $scope.normalnote = true;
  $scope.activenote = true;
  $scope.activitynote = false;

  $scope.keep = "My Keep";
  $scope.mainNote = true;
  $scope.takeclick = function() {
    $scope.mainNote = false;
    $scope.dummyNote = true;
  }

  $scope.color = [{
      "color": "#fff",
      "path": "../images/moonwhite.png",
      "tooltip": "White",
    },
    {
      "color": "#ff8a80",
      "path": "../images/moonred.png",
      "tooltip": "Red",
    },
    {
      "color": "#ffd180",
      "path": "../images/moonyellow.png",
      "tooltip": "Orange",
    },
    {
      "color": "#ffff8d",
      "path": "../images/moonlyellow.png",
      "tooltip": "Yellow",
    },
    {
      "color": "#cfd8dc",
      "path": "../images/moongrey.png",
      "tooltip": "Gray",
    },
    {
      "color": "#80f8ff",
      "path": "../images/moonblue.png",
      "tooltip": "Blue",
    },
    {
      "color": "#ccff90",
      "path": "../images/moongreen.png",
      "tooltip": "Green",
    },
    {
      "color": "#a7ffeb",
      "path": "../images/moonaqua.png",
      "tooltip": "Teal",
    }
  ]



  $scope.image = function() {
    var url = "http://localhost:8081/userprofile";
    console.log();
    var obj = mykeepService.app(url);
    mykeepService.app(url).then(function(data) {

      $rootScope.userinfo = data.data.userinfo;
      $rootScope.userName = data.data.userinfo.local.userName; //fetching userName by local schema
      // console.log("inside image");
      console.log("user", $rootScope.userName);
    }).catch(function(error) {
      console.log(error);
    })
  };
  $scope.image();

  $scope.changeProfileImage = function() {
    var modalInstance = $uibModal.open({
      templateUrl: "../html/profileImage.html",
      controller: "profileImageController",
      resolve: {}
    });
    modalInstance.result.catch(function(error) {
      console.log("error", error);
    });
    this.cancel = function() {
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
      if (data.data.status == true) {
        var arrNote = [];
        // console.log( data.data.message.length );
        for (var i = data.data.message.length - 1; i >= 0; i--) {
          arrNote[arrNote.length] = data.data.message[i];
        }
        // console.log(arrNote);
        $scope.message = arrNote;
      } else {
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

    if (title == "" && note == "" || title == undefined && note == undefined || title == null && note == null) {
      return;
    }

    var url = "http://localhost:8081/createCards";

    var obj = mykeepService.app(url, object);
    obj.then(function(data) {
      $scope.getmsgcard();
      toastr.success('Note Created', 'Successful');
      // console.log(data.data.status);
    }).catch(function(error) {
      console.log("error1");
    });
    $scope.getmsgcard();
  } //end of savemsgcard()

  $scope.gridview = function() {
    // console.log("gridview");
    $scope.gridlist = "gridviewnew";
    $scope.innote = "col-xs-12 col-sm-12 col-md-6 col-lg-3 drag gridcss";
    $scope.showpreid = "preid cardhover";

    $scope.gridstyle = {
      'display': 'none'
    }
    $scope.liststyle = {
      'display': 'block'
    }
    localStorage.setItem("view", "grid");
  }

  $scope.listview = function() {
    // console.log("listview");
    $scope.gridlist = "gridviewnew";
    $scope.innote = "col-sm-12 col-lg-12 col-md-12 col-xs-12 drag listcss";
    $scope.showpreid = "preid1 cardhover";

    $scope.liststyle = {
      'display': 'none'
    }
    $scope.gridstyle = {
      'display': 'block'
    }
    localStorage.setItem("view", "list");
  }

  if (localStorage.getItem("view") == "grid") {
    // console.log("grid");
    $scope.gridview();
  } else {
    // console.log("list");
    $scope.listview();
  }


  /**
   * @function deleteCards - delete cards
   * @param {String} cards - contain cards
   * @return - success status return  else error message
   */
  // controller for delete card
  $scope.deletecards = function(x, del) {
    var delObj = {
      del: del,
      userid: x.userid,
      title: x.title1
    }
    var url = "http://localhost:8081/deleteMsgCard/" + x._id + "";
    mykeepService.app(url, delObj).then(function(data) {
      $scope.getmsgcard();
      // toastr.error('Note Trashed');

    }).catch(function(error) {
      console.log(error);
    })
  }



  $scope.refresh = function() {
    $route.getmsgcard();
  }

  //this is used for sharing card in facebook
  $scope.facebookshare = function(x) {
    console.log("facebook share")
    FB.init({
      appId: '1643439169007876',
      status: true,
      xfbml: true
    });
    console.log("ananya");
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            // your url to share
            'og:title': x.title1,
            'og:content': x.content
          }
        })
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
          // then get post content
          alert('successfully posted. Status id : ' + response.post_id);
        } else {
          alert('Something went error.');
        }
      });

  };



  /**
   * @function popup - create popup modal
   * @param {String} cards - contain cards detail
   */


  $scope.popup = function(datanote) {
    var modalInstance = $uibModal.open({
      templateUrl: "../html/popup.html",
      controller: function($uibModalInstance) {
        var $ctrl = this;
        this.id = datanote._id;
        this.title1 = datanote.title1;
        this.content = datanote.content;
        this.created_at = datanote.created_at;
        this.updated_at = datanote.updated_at;
        this.color = datanote.color;

        this.updateCard = function() {
          // console.log("inside updation");
          updateNote = {
            title1: this.title1,
            content: this.content,
            updated_at: this.updated_at,
            userid: datanote.userid

          }
          console.log("updateNote:", updateNote);
          // console.log(updateNote);
          var url = "http://localhost:8081/updateMsgCards/" + this.id + "";
          var obj = mykeepService.app(url, updateNote);

          obj.then(function(data) {
            if (data.data.status == true) {
              $scope.getmsgcard();
            } else {
              console.log("not updated");
            }
          }).catch(function(error) {
            console.log(error);
          })
        };

        this.cancel = function() {
          // console.log("updation cancelled");
          $uibModalInstance.dismiss('cancel');
        };
      },
      controllerAs: "$ctrl"
    });

    modalInstance.result.catch(function(error) {
      console.log("error", error);
    }).then(function(data) {
      if (data) {
        console.log(data);
      }
    });
  } //popup close


  /**
   * @function collaborator - create,find collaborator and send card to the collaborator
   * @param {String} User - contain user
   */
  $scope.collaboratorList = []; //make a collaborator list
  var homecnt = this; //it is define for access this outside collaborator function
  $scope.collaborator = function(x) { //to add collaborator,x is card
    object = {
      id: x.userid,
      col: 'collaborator'
    }
    var url = "http://localhost:8081/logIn"; //logIn api call
    var obj = mykeepService.app(url, object);
    console.log("url nd obj passed", obj);
    obj.then(function(data) {
      console.log("data-message::", data.data.message);
      $rootScope.displayName = data.data.message.displayName; //fetch owner display name
      $rootScope.email = data.data.message.googleEmail; //fetch owner email(fetch only gmail's email)
      console.log("email::", $scope.email);
      console.log("displayName::", $scope.displayName);


      var modalInstance = $uibModal.open({ //cal modalInstance
        templateUrl: "../html/collaborator.html", //vollaborator.html call
        controller: function($uibModalInstance, $scope) {
          var $ctrl = this;
          this.colHit = function(demo) { //cilHit call on save button clicked,demo is passed emailid which i want to send card
            var url = "/shareNote"; //call shareNote api
            var shareObj = {
              emailid: demo //this is receiver emailid
            }

            var obj = mykeepService.app(url, shareObj);
            obj.then(function(data) {
              toastr.info('Note send', 'Successful');
              console.log("id col res", data.data.result._id);
              $rootScope.collabData = data.data.result._id; //user id-which i send the card--it is in data.data.result._id;which is stored in collabData.
              // var url="/createcards";
              var object = //create one object of selected card
                {
                  id: $rootScope.collabData,
                  data: x,
                  share: "share"
                }
              // console.log("colabdata",object);
              var url = "/createCards";                      //call createcard api for sharing card
              var obj = mykeepService.app(url, object);      //pass the url and object of card
              obj.then(function(data) {
                // toastr.success('Note send','Successful');
                console.log("data saved in another id", data);
              }).catch(function(error) {
                constitle1ole.log("err");
              })
            });
            collab(demo);                                     //call collab;collab function have receiver userid and selected cardid;which is send by demo--'demo' contain Owner mailid
          }
          this.findCollab = function() {                      //it is use for find receiver--findcollab call onclicking on text box
            var url = "/findCollaborator";                    //findCollaborator api call
            var obj = mykeepService.app(url);
            obj.then(function(data) {
              var colListArray = data.data.userinfo.map(function(mapData) { //find the list of all emailid,which is present in database
                if (mapData.local) {
                  return mapData.local.email;
                } else {
                  if (mapData.facebook) {
                    return mapData.facebook.facebookEmail;
                  } else {
                    if (mapData.google) {
                      return mapData.google.googleEmail;
                    }
                  }
                }
              });
              colListArray = colListArray.filter(function(filterData) {             //filter the data if undefined and null oe empty
                return filterData !== undefined || filterData !== null || filterData !== ""
              });
              $scope.collaboratorList = colListArray;                               //give list of all email
              // console.log("find colllll",colListArray);
              // console.log("find colllll",data.data.userinfo[0].local.email);
            }).catch(function(error) {
              console.log("err");
            })

          }
          this.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };

          var collab = function(data) { //colaab function contain data--which have selected card id and email of receiver i.e. which I want to send that card
            console.log("cardId", x.userid, "email", data);
          }
        },
        controllerAs: "$ctrl"
      });
    }).catch(function(error) {
      console.log(error);
    })
  };



  /**
   * @function createreminder - create reminder
   * @param {String} remDate - contain reminder date
   */

  $scope.createReminder = function(x, day) {
    // console.log(cardsid);
    $scope.day = day;
    var remDate = new Date();

    if ($scope.day == "today") {
      var today = new Date();
      remDate.setHours(20, 0, 0);
      $scope.day = new Date(today);
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
    } else {
      $scope.day = new Date(day);
    }

    var remDay = {
      reminder: $scope.day,
      userid: x.userid,
      title: x.title1
    }
    var url = "http://localhost:8081/reminder/" + x._id + "";
    var obj = mykeepService.app(url, remDay);

    obj.then(function(data) {
      if (data.data.status == true) {
        toastr.success('Reminder Created', 'Successful');

        $scope.getmsgcard();
      } else {
        console.log("not updated");
      }
    }).catch(function(error) {
      console.log(error);
    })
  };


  /**
   * @function deleteReminder - delete reminder
   * @param {String} remDate - contain reminder date
   */

  $scope.deleteReminder = function(x) {
    var url = "http://localhost:8081/reminderDelete/" + x._id + "";
    var delRemObj = {
      userid: x.userid,
      title: x.title1
    }
    mykeepService.app(url, delRemObj).then(function(data) {
      toastr.info('Reminder Deleted', 'Successful');

      $scope.getmsgcard();
    }).catch(function(error) {
      console.log(error);
    })
  };


  /**
   * @function cardCopy - copy the card
   * @param {String} cards - contain card details
   */
  $scope.cardCopy = function(x) {
    var url = "http://localhost:8081/createCards";
    var copyObj = {
      userid: x.userid,
      title1: x.title1,
      content: x.content,
      color: x.color

    }
    console.log("copy", copyObj);
    mykeepService.app(url, copyObj).then(function(data) {
      toastr.info('Card Copied');
      $scope.getmsgcard();
    }).catch(function(error) {
      // console.log("error1");
    });
  }


  /**
   * @function changeColor - contain color
   * @param {String} color_data - contain color data
   */
  $scope.changeColor = function(color, x) {
    var colorData = {
      color: color,
      userid: x.userid,
      title: x.title1
    }
    var url = "http://localhost:8081/color/" + x._id + "";
    mykeepService.app(url, colorData).then(function(data) {
      toastr.success('Color Changed', 'Successful');

      $scope.getmsgcard();
    }).catch(function(error) {
      console.log(error);
    });
  }


  /**
   * @function pinup - contain cards
   * @param {String} cards - contain object of cards(pin and archive value contain)
   */
  $scope.pinup = function(x, pin, archive) {
    var url = "http://localhost:8081/pinUp/" + x._id + "";
    var object = {
      pin: pin,
      archive: archive,
      userid: x.userid,
      title: x.title1
    }
    console.log("pinned", object);
    mykeepService.app(url, object).then(function(data) {
      // toastr.info('Note Pinned','Successful');
      $scope.getmsgcard();
    }).catch(function(error) {
      console.log(error);
    });
  }


  /**
   * @function archive - contain cards
   * @param {String} cards - contain object of cards(pin and archive value contain)
   */
  $scope.archive = function(x, archive, pin) {
    var url = "http://localhost:8081/archive/" + x._id + "";
    var object = {
      pin: pin,
      archive: archive,
      userid: x.userid,
      title: x.title1
    }
    mykeepService.app(url, object).then(function(data) {
      $scope.getmsgcard();
    }).catch(function(error) {
      console.log(error);
    });
  }

  /**
   * logout controller
   */
  $scope.logOut = function() {
    var url = "http://localhost:8081/logOut";
    mykeepService.app(url).then(function(data) {

    }).catch(function(error) {
      console.log(error);
    });

    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()
      .then(function() {
        toastr.info('You have been logged out');
        $state.go('/');
      });
  }


});
