$(document).on("click", "#logOutId", function() {
  $.ajax({
    url: "http://localhost:8081/logout",
    datatype: "json",
    type: "GET",
    success: function(data) {
      if (data.status == false) {
        welcomePage();
      }
    }
  });
});
