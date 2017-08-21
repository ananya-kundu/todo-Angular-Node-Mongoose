

  app.directive("color", function() {
	console.log("inside the directive");
    return {
        restrict : "AE",
        templateUrl : "html/directiveView/colorDir.html"
    };
});




app.directive("archive", function() {
console.log("inside the directive");
return {
    restrict : "AE",
    templateUrl : "html/directiveView/archiveDir.html"
};
});



app.directive("reminder", function() {
console.log("inside the directive");
return {
    restrict : "AE",
    templateUrl : "html/directiveView/reminderdir.html"
};
});



app.directive("reminderdisplay", function() {
console.log("inside the directive");
return {
    restrict : "AE",
    templateUrl : "html/directiveView/reminderfooter.html"
};
});


app.directive("facebookshare", function() {
console.log("inside the directive");
return {
    restrict : "AE",
    templateUrl : "html/directiveView/fbshare.html"
};
});


app.directive("more", function() {
console.log("inside the directive");
return {
    restrict : "AE",
    templateUrl : "html/directiveView/moreicon.html"
};
});
