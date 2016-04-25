$(document).ready(function(){

  error_msg = "";

  var s_val = "";
  var b_val = "";
  var g_val = "";

  $(".registration").css("margin-top", scr_height * 0.3);

  $(".straight").click(function(){
    s_val = $(".straight").val();
    b_val = $(".bi").val();
    g_val = $(".gay").val();
    if(s_val == "1") {
      $(".straight").attr("checked", false);
      $(".straight").val("0");
    } else {
      $(".straight").val("1");
      if (b_val == "1") {
        $(".bi").attr("checked", false);
        $(".bi").val("0");
      }
      if (g_val == "1") {
        $(".gay").attr("checked", false);
        $(".gay").val("0");
      }
    }
  });

  $(".bi").click(function(){
    s_val = $(".straight").val();
    b_val = $(".bi").val();
    g_val = $(".gay").val();
    if(b_val == "1") {
      $(".bi").attr("checked", false);
      $(".bi").val("0");
    } else {
      $(".bi").val("1");
      if (s_val == "1") {
        $(".straight").attr("checked", false);
        $(".straight").val("0");
      }
      if (g_val == "1") {
        $(".gay").attr("checked", false);
        $(".gay").val("0");
      }
    }
  });

  $(".gay").click(function(){
    s_val = $(".straight").val();
    b_val = $(".bi").val();
    g_val = $(".gay").val();
    if(g_val == "1") {
      $(".gay").attr("checked", false);
      $(".gay").val("0");
    } else {
      $(".gay").val("1");
      if (b_val == "1") {
        $(".bi").attr("checked", false);
        $(".bi").val("0");
      }
      if (s_val == "1") {
        $(".straight").attr("checked", false);
        $(".straight").val("0");
      }
    }
  });

  $(".btn-re-signup").click(function() {
    password = $("input[name='password']").val();
    password_confirmation = $("input[name='confirm-password']").val();
    email = $("input[name='email']").val();
    // alert($("input[name='straight']:checked").val());
    // alert(orient);
    s_val = $(".straight").val();
    b_val = $(".bi").val();
    g_val = $(".gay").val();
    if (s_val == "1") {
      orient = "straight";
    } else if (b_val == "1") {
      orient = "bi";
    } else if (g_val == "1") {
      orient = "gay";
    } else {
      alert("Select your orietation");
      return;
    }
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

        if (data['success'] == true) {
          var message = {
            user_id: data['user_id'],
            access_token: data['access_token']
          };

          localStorage.setItem('test', JSON.stringify(message));
          var msg = localStorage.getItem('test');
          var view = new supersonic.ui.View("cupid#LinkwithFB");
          supersonic.ui.layers.push(view);
          // alert("Sign up successful. We will now direct you to a page where you link Cupid with your facebook account");
          // alert("hit back and sign in after you've successfully linked your facebook account.");
          // supersonic.app.openURL("http://loveisintheair.herokuapp.com/signin");
        } else {

          $("#error-handler").remove();
          $('<div>', {id: "error-handler", style: "background-color:#F01644; opacity:0.7"}   ).insertAfter("#title");


          $.each(data['errors'],

                 function(index, error){
                  $("#error-handler").append( $('<p>', {text: error, style: "color:#FFFFFF"}) );
                 });

        }

      }
    });
  });
});
