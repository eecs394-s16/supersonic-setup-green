$(document).ready(function(){

  error_msg = "";

  $(".registration").css("margin-top", scr_height * 0.3);

  $(".btn-re-signup").click(function() {
    password = $("input[name='password']").val();
    password_confirmation = $("input[name='confirm-password']").val();
    email = $("input[name='email']").val();
    orient = "straight";
    alert(orient);
    account_info = {'user': {'password': password, 'password_confirmation': password_confirmation, 'email': email, 'orientation': orient}};
    account_info = JSON.stringify(account_info);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/api/users",
      data: account_info,
      error: function(err) {
        var keys = Object.keys(err);
        alert(keys);
        alert(err['status']);
        // error_msg = err['errors'][0];
        // alert(error_msg);
      },
      success: function(data) {
        alert(data["access_token"]);
        if (data['success'] == true) {
          
          alert('This was a success');
          
        } else {
          
          $("#error-handler").remove();
          $('<div>', {id: "error-handler", style: "background-color:#E31644; opacity:0.7"}   ).insertAfter("#title");
          
          
          $.each(data['errors'],

                 function(index, error){
                  $("#error-handler").append( $('<p>', {text: error, style: "color:#FFFFFF"}) );
                 });
     
          
          // $.each(data['errors'], function(key, value) {$("h1").html()}
          
          
        }
      }
    });
  });

  // supersonic.ui.views.find("settingsView").then( function(startedView) {
  //   supersonic.ui.layers.push(startedView);
  // });

});
