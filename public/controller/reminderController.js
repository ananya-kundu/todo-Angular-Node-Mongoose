
/**
  * reminder Controller - it is remainder page controller
  * it controls changes of reminderpage
  * show cards if card contain reminder
  * reminderController is sub controller of dashboardController
  */

app.controller('reminderController', ['$scope', '$controller', function($scope, $controller){
  $controller('dashboardController', {$scope: $scope}),
  //inside scope you the controllerOne scope will available
  $scope.activenote = false;
  $scope.remindernote = true;
  $scope.pinnote=false;
  $scope.normalnote=false;
  $scope.keep="Reminder";                   //brand name for reminder controller

  // console.log("sdfsd" ,$scope.remindernote);
  //color change for reminderController
  $scope.archivesidebar = {'background':"transparent"};
  $scope.archivenav = {'background-color':"rgb(96, 125, 139)"};
  $scope.archivegly = {'color':'white'};
  $scope.liststyle = {'color':'white'};
  $scope.gridstyle = {'color':'white'};
  $scope.brandname = {'color':'white','font-size':'x-large'};
  $scope.archiverefresh = {'fill':'white'};

  $scope. archivesearch = {'background-color':"rgb(96, 125, 139)"};
  // $scope. archivesearch = {'background-color':"white"};
  $scope. archivequery = {'background-color':"white",'color':'white'};
  $scope. archivequerybtn = {'background-color':"rgba(122, 146, 158,1)"};


  // console.log("archive",$scope.archivenote);
}]);
