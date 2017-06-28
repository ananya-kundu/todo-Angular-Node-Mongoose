
/**
  * archive Controller - it is archive page controller
  * it controls changes of archivepage
  * show cards if card is archived
  * trashController is sub controller of dashboardController
  */


app.controller('trashController', ['$scope', '$controller', function($scope, $controller){
  $controller('dashboardController', {$scope: $scope}),
  //inside scope you the controllerOne scope will available
  $scope.activenote = false;
  $scope.trashnote = true;
  $scope.pinnote=false;
  $scope.normalnote=false;
  $scope.keep="Trash";

  //color change for reminderController
  $scope.archivesidebar = {'background':"white"};
  $scope.archivenav = {'background-color':"rgb(99, 99, 99)"};
  $scope.archivegly = {'color':'white'};
  $scope.liststyle = {'color':'white'};
  $scope.gridstyle = {'color':'white'};
  $scope.brandname = {'color':'white','font-size':'x-large'};
  $scope.archiverefresh = {'fill':'white'};

  $scope. archivesearch = {'background-color':"transparent"};
  $scope. archivequery = {'background-color':"white",'color':'white'};
  $scope. archivequerybtn = {'background-color':"rgba(122, 146, 158,1)"};

  // console.log("archive",$scope.archivenote);
}]);
