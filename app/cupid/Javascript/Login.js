$(document).ready(function() {
  scr_height = $(window).height();
  $(".login").css("margin-top", scr_height * 0.3);
  $(".btn-login").click(function(){
    // window.location.href = "http://loveisintheair.herokuapp.com/signin"
    window.location.href = "http://localhost/Match"
  	// sendFBlogin();

    //supersonic.ui.initialView.dismiss();

  });
});

function sendFBlogin() {
	formData=$('form').serializeArray();// get the username and password
    login_credential = {'user_name':formData[0]['value'], 'password':formData[1]['value']};
    login_credential = JSON.stringify(login_credential);//turn into a json object
    // alert("h");
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/api/login",
      data: login_credential,
      error: function(er) {
        var keys = Object.keys(er);
        // alert(keys);
        // // console.log(er);
        // alert(er['error']);
        // // alert(er['getAllResponseHeaders']);
        // // alert(er['status']);
        // alert('just dismissing the window and pretend it succeeded for now');
      	supersonic.ui.initialView.dismiss();
      },
      success: function(data) {
      	// The form of data passed back will be:
      	supersonic.ui.initialView.dismiss();
        alert("yes");
      }
    });
  }
