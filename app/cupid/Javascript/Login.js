$(document).ready(function() {

  var access_token = "";
  scr_height = $(window).height();
  $(".login").css("margin-top", scr_height * 0.3);
  $(".login-signin").click(function(){
  	sendFBlogin();
  });
  $(".login-signup").click(function(){
    var view = new supersonic.ui.View("cupid#Registration");
    supersonic.ui.layers.push(view);
  });
  supersonic.data.channel('public_announcements').subscribe( function(message) {
    access_token = message['content'];
  });
});

function sendFBlogin() {
	formData=$('form').serializeArray();// get the username and password
    login_credential = {'session': {'email':formData[0]['value'], 'password':formData[1]['value']}};
    login_credential = JSON.stringify(login_credential);//turn into a json object
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/login",
      data: login_credential,
      error: function(er) {
        var keys = Object.keys(er);
        alert(er['status']);
      },
      success: function(data) {
      	// The form of data passed back will be:
        alert(data["success"]);
        var message = {
          user_id: data['user_id'],
          access_token: data['access_token']
        };
        alert(data['user_id']);
        alert(data['access_token']);
        localStorage.setItem('test', JSON.stringify(message));
        var msg = localStorage.getItem('test');
        msg = jQuery.parseJSON(msg);
        supersonic.ui.initialView.dismiss();
      }
    });
  }
