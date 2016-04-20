$(document).ready(function() {
  var access_token = "";
  scr_height = $(window).height();
  $(".login").css("margin-top", scr_height * 0.3);
  $(".login-signin").click(function(){
  	sendFBlogin();
    //supersonic.ui.initialView.dismiss();
  });
  $(".login-signup").click(function(){
    var view = new supersonic.ui.View("cupid#Registration");
    supersonic.ui.layers.push(view);
  });
  supersonic.data.channel('public_announcements').subscribe( function(message) {
    access_token = message['content'];
    // alert(Trajectory.access_token);
    // alert(message['content']);
  // console.log("received a message " + message);
  });
  $(".yes").click(function(){
    alert(access_token);
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
