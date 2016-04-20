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
        alert(data["success"]);
        alert(data["errors"]);
        alert(data["access_token"]);
      }
    });
  });

  // supersonic.ui.views.find("settingsView").then( function(startedView) {
  //   supersonic.ui.layers.push(startedView);
  // });

});
