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
        if (data["success"]==true){
          if (data['fb_connected'] == false) {
            alert('Please link with your facebook account first');
          } else {
            var message = {
              user_id: data['user_id'],
              access_token: data['access_token']
            };

            localStorage.setItem('test', JSON.stringify(message));
            // var msg = localStorage.getItem('test');
            // msg = jQuery.parseJSON(msg);
            supersonic.ui.initialView.dismiss();

            login_errors=document.getElementById("login_errors");
            login_errors.innerHTML="";
            login_errors.visibility="hidden";
          }
        }
        else{

          login_errors=document.getElementById("login_errors");
          if (data["error_msg"]){
            //alert(data["error_msg"]);
            login_errors.innerHTML=data["error_msg"];
          }else{
            //alert("Login not successful. Double check your email and password and make sure you've linked your facebook account with it.");
            login_errors.innerHTML="Login not successful. Double check your email and password.";
          }
          login_errors.visibility="visible";
        }
      }
    });
  }
