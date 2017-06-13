
/**
  * archive Controller - it is archive page controller
  * it controls changes of archivepage
  * show cards if card is archived
  */


app.controller('archiveController', ['$scope', '$controller', function($scope, $controller){
  $controller('dashboardController', {$scope: $scope}),
  //inside scope you the controllerOne scope will available
  $scope.archivenote = false;

  $scope.archivesidebar = {'background':"transparent"};
  $scope.archivenav = {'background-color':"rgb(96, 125, 139)"};
  $scope.archivegly = {'color':'white'};
  $scope.liststyle = {'color':'white'};
  $scope.gridstyle = {'color':'white'};
  $scope.archivebrand = {'color':'white','font-size':'x-large'};
  $scope.archiverefresh = {'fill':'white'};

  $scope. archivesearch = {'background-color':"rgb(96, 125, 139)"};
  $scope. archivequery = {'background-color':"rgba(122, 146, 158,1)",'color':'white'};
  $scope. archivequerybtn = {'background-color':"rgba(122, 146, 158,1)"};

  // console.log("archive",$scope.archivenote);
}]);
