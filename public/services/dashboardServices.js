

app.service('mykeepService', function($http) {
  this.app = function(url,data) {
    // console.log("i'm service");
    return $http({
        url: url,
        method: "POST",
        data : data
    });
  }
});















// app.service('loginservice', function($http) {
//   this.app = function(userLogin) {
//     return $http({
//       url: "http://localhost:8081/login",
//       method: "POST",
//       data: userLogin
//     });
//   }
// });
// app.service('sessionService', function($http) {
//   this.app = function() {
//     return $http({
//       url: "http://localhost:8081/session",
//       method: "GET",
//       // data: object
//     });
//   }
// });
// app.service('signupservice', function($http) {
//   this.app = function(userObj) {
//     return $http({
//       url: "http://localhost:8081/signup",
//       method: "POST",
//       data: userObj
//     });
//   }
// });
//
//
//
//
// app.service('savemsgcardService', function($http) {
//   this.app = function(object) {
//     return $http({
//       url: "http://localhost:8081/createcards",
//       method: "POST",
//       data: object
//     });
//   }
// });
// app.service('getmsgcardService', function($http) {
//   this.app = function() {
//     return $http({
//       url: "http://localhost:8081/pinup",
//       method: "GET",
//       // data: object
//     });
//   }
// });
// app.service('deletecardService', function($http) {
//   this.app = function(cardsid) {
//     return $http({
//       url: "http://localhost:8081/deletemsgcard/" + cardsid + "",
//       method: "DELETE",
//     });
//   }
// });
// app.service('updatemsgcardService', function($http) {
//   this.app = function(data,cardsid) {
//     return $http({
//       url: "http://localhost:8081/updatemsgcards/" + cardsid + "",
//       method: "POST",
//       data : data
//     });
//   }
// });
// app.service('reminderService', function($http) {
//   this.app = function(cardsid,data) {
//     console.log("i'm reminder service");
//     return $http({
//       url: "http://localhost:8081/reminder/" + cardsid + "",
//       method: "POST",
//       data : data
//     });
//   }
// });
// app.service('reminderDeleteService', function($http) {
//   this.app = function(cardsid) {
//     return $http({
//       url: "http://localhost:8081/reminderdelete/" + cardsid + "",
//       method: "DELETE",
//     });
//   }
// });
//
// app.service('changeColorService', function($http) {
//   this.app = function(color,cardsid) {
//     var colorObj = {
//       color : color
//     }
//     console.log("i'm changecolor service");
//     return $http({
//       url: "http://localhost:8081/color/" + cardsid + "",
//       method: "POST",
//       data : colorObj
//     });
//   }
// });
