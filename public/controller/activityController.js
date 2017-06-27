
/**
  * archive Controller - it is archive page controller
  * it controls changes of archivepage
  * show cards if card is archived
  */


app.controller('activityController', ['$scope', '$controller','mykeepService', function($scope, $controller,mykeepService){
  $controller('dashboardController', {$scope: $scope}),
  //inside scope you the controllerOne scope will available
  $scope.activenote = false;
  $scope.activitynote = true;
  $scope.pinnote=false;
  $scope.normalnote=false;
  $scope.keep="Activity Log";

  $scope.archivesidebar = {'background':"white"};
  $scope.archivenav = {'background-color':"rgb(99, 99, 99)"};
  $scope.archivegly = {'color':'white'};
  $scope.liststyle = {'color':'white'};
  $scope.gridstyle = {'color':'white'};
  $scope.brandname = {'color':'white','font-size':'x-large'};
  $scope.archiverefresh = {'fill':'white'};

  $scope. archivesearch = {'background-color':"rgb(99, 99, 99)"};
  $scope. archivequery = {'background-color':"white",'color':'white'};

  $scope. archivequerybtn = {'background-color':"rgba(122, 146, 158,1)"};



  $scope.activity = function(){
    var url = "http://localhost:8081/activityLogger";
    console.log("ffgfg");
   mykeepService.app(url).then(function(data){
     console.log(data.data.message);
     var activityArray =[];
     for(i in data.data.message){
       activityArray[i] = data.data.message[i];
     }
     $scope.activityDisplay = activityArray;
     console.log("display",$scope.activityDisplay);
     }).catch(function(error){
       console.log(error);
     })

  }
  $scope.activity();
  // console.log("archive",$scope.archivenote);
}]);