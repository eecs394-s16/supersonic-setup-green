$(document).ready(function() {
  scr_height = $(window).height();
  $(".login").css("margin-top", scr_height * 0.3);
  $(".btn-login").click(function(){
    supersonic.ui.initialView.dismiss();
  });
});
