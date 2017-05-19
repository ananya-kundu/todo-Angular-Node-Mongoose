var app = angular.module("myApp", []);
app.controller("next", function($scope) {
// angular.module('myApp').controller('next', function ($scope, $http) {
    // $http.get('Directive/dummy.json').success(function(data){
    //     $scope.dummy = data;
    // })
    // $scope.dummy =
    // {
    //     "Title":[{
    //         "title1": "t1",
    //         "title2": "t2",
    //         "title3": "t3",
    //         "title4": "t4",
    //         "title5": "t5"
    //
    //     }],
    //     "Content": [{
    //         "content1": "c1",
    //         "content": "c2",
    //         "content": "c3",
    //         "content": "c4",
    //         "content": "c5"
    //     }]
    // };

    $scope.dummy={
      "obj1" : [{
        "title": "t1",
         "content": "c5"
       }],

        "obj2" : [{
          "title": "t3",
        "content": "c4"
      }],
      "obj3" : [{
        "title": "t3",
      "content": "c4"
    }],
    "obj4" : [{
      "title": "t3",
    "content": "c4"
  }]
    }
      console.log($scope.dummy);
  });

    // console.log($scope.dummy.content[0]);
    // $scope.dum = {
    //     "header" : [{
    //         "date" : $scope.dummy.header[0].date,
    //         "inTime" : $scope.dummy.header[0].inTime,
    //         "outTime" : $scope.dummy.header[0].outTime,
    //
    //     }],
    //     "data" : [{
    //         "date" : $scope.dummy.data[0].date,
    //         "inTime" : $scope.dummy.data[0].inTime,
    //         "outTime" : $scope.dummy.data[0].outTime,
    //
    //     }]
    // };
    // console.log($scope.dum.header);
