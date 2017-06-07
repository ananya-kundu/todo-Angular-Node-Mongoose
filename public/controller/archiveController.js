app.controller('archiveController', ['$scope', '$controller', function($scope, $controller){
  $controller('dashboardController', {$scope: $scope}),
  //inside scope you the controllerOne scope will available
  $scope.archivenote = false;

  $scope.archivesidebar = {'background':"transparent"};
  $scope.archivenav = {'background-color':"rgb(96, 125, 139)"};
  $scope.archivegly = {'color':'white'};
  $scope.gridstyle = {'color':'white'};
  $scope.liststyle = {'color':'white'};
  $scope.archivebrand = {'color':'white'};
  $scope. archivesearch = {'background-color':"rgb(96, 125, 139)"};
  $scope. archivequery = {'background-color':"rgb(122, 146, 158);"};

  console.log("archive",$scope.archivenote);
}]);
