app.controller('dashboardController', function($scope, savemsgcardService, getmsgcardService) {
  console.log("ghsjh");
  console.log($scope);
  // $scope.message = 'hi...welcome to front page!';


  $scope.getmsgcard = function() {
    var obj = getmsgcardService.app();
    obj.then(function(data) {
      console.log(data);
      $scope.message = data.data.message;

    }).catch(function(error) {

    });
  }
  $scope.getmsgcard();
  $scope.savemsgcard = function() {
    var title = $scope.title;
    var note = $scope.note;
    console.log("kfjskafj");
    console.log(title);
    console.log(note);
    var object = {
      title1: title,
      content: note
    }
    // console.log();
    // console.log(data2);
    var obj = savemsgcardService.app(object);
    obj.then(function(data) {
      // console.log(data.data.status);
    }).catch(function(error) {

    });
    $scope.getmsgcard();
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
  this.app = function(object) {
    return $http({
      url: "http://localhost:8081/pinup",
      method: "GET",
      data: object
    });
  }
});
