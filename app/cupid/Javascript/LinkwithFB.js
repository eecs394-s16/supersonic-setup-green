$(document).ready(function(){
  $('.linkbtn').click(function(){
    supersonic.app.openURL("http://loveisintheair.herokuapp.com/signin");
  });

  $('.sign_btn').click(function () {
    supersonic.ui.initialView.dismiss();
  });
});
