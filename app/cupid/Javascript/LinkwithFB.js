$(document).ready(function(){
  $('.linkbtn').click(function(){
    supersonic.app.openURL("http://loveisintheair.herokuapp.com/signin");
  });

  $('.sign_btn').click(function () {
    message = localStorage.getItem('test');
    message = jQuery.parseJSON(message);

    access_token = message['access_token'];
    cur_usr_id = message['user_id'];

    usr_data = {'user_id': cur_usr_id, 'match_id': false, 'yes': false, 'access_token': access_token};
    usr_data = JSON.stringify(usr_data);
    // alert(usr_data);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/api/votes",
      data: usr_data,
      error: function(er) {
        alert(er['status']);
      },
      success: function(data) {
        if(data['fb_connected'] == false) {
          alert('Please link with your facebook account first');
        } else {
          supersonic.ui.initialView.dismiss();
        }
      }
    });
  });
});
