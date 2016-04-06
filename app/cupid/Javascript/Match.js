$(document).ready(function(){

  //user data
  cur_usr_name = "";
  cur_usr_id = "";
  user_img_1 = "";
  user_img_2 = "";
  user_name_1 = "";
  user_name_2 = "";
  user_id_1 = "";
  user_id_2 = "";
  match_id = "";
  vote = false;
  MyMatchPage = "";
  readyToMatch=true;//Set to true for now. If false, we cannot click the match button. That means either we have not received a new match yet or we're in animation stage.

  //css auto-adjust according to the screen size
  scr_height = $(window).height();
  scr_width = $(window).width();
  // div_height = $('.match-page').height();
  // div_width = $('.match-page').width();
  // alert(div_height);
  // alert(div_width);
  // $(".div-overlap").css("height", "100%");
  // $(".div-overlap").css("width", scr_width);
  // $(".match_space").css("margin-top", scr_height * 0.05);
  $(".person_frame").css("height", scr_width * 0.6);
  $(".person_frame").css("width", scr_width * 0.5);
  $(".user_pic").css("height", scr_width * 0.5 * 0.70);
  $(".user_pic").css("width", scr_width * 0.5 * 0.70);
  $(".user_name").css("height", scr_width * 0.5 * 0.25);
  $(".user_name").css("width", scr_width * 0.5 * 0.25);
  $(".btn-select").css("height", scr_width * 0.5 * 0.75 * 0.5);
  $(".btn-select").css("width", scr_width * 0.5 * 0.75 * 0.5);
  $("#selection_part").css("margin-top", scr_height * 0.1);
  $(".div-hidden").css("height", scr_height);
  $(".div-hidden").css("z-index", 999);
  $(".div-hidden").css("display", "none");
  $(".div-hidden").css("position", "relative");
  $(".div-hidden").css("bottom", scr_height);
  // $(".div-hidden").css("margin-top", scr_height);
  $(".heart").css("margin-top", scr_height * 0.5 * 0.8);

  //receive the first data from the server

  user_img_1 = "/icons/pig1.jpg";
  user_img_2 = "/icons/pig2.jpg";
  user_name_1 = "1";
  user_name_2 = "2";
  cur_usr_name = "hah";
  $(".user_img_1").attr("src", user_img_1);
  $(".user_img_2").attr("src", user_img_2);
  $(".user_name_1").html(user_name_1);
  $(".user_name_2").html(user_name_2);
  $(".cur_usr_name").html(cur_usr_name);

  //event triger
  $(".user_1").click(function(){

  });

  $(".user_2").click(function(){

  });

  $(".btn-close").click(function(){

  });

  $(".btn-checkmark").click(function(){
    if (readyToMatch){
      // switch readyToMatch to false so that user cannot double click the same button
      readyToMatch=false;
      // change the html to show the name of the two matches. Change it to first name later
      $(".heart").html(user_name_1+'<span style="font-size: 75px; color: red;">&hearts;</span>'+user_name_2);
      //$("#match_screen").css("filter","blur(5px)"); blur doesnt work
      //$(".div-hidden").css("background-color", "rgba(0,152,50,0.7)");
      $(".div-hidden").show();
      animateHeart(0);
    }
  });

  $(".view-result").click(function(){
    SeeMyMatch();
  });

  function SendVote() {

  }

  function RefreshMatch() {
    $('.heart span').stop();
  }

  function SeeMyMatch() {
    usr_data = {'usr_id': cur_usr_id, 'usr_name': cur_usr_name};
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: MyMatchPage,
      data: usr_data,
      success: page_redirect(res)
    });
  }

  function page_redirect(res) {
    if (res.status == 'success') {
      window.location.href = MyMatchPage;
    }
  }

  function animateHeart(times_run) {
    $('.heart span').animate({
        fontSize: $('.heart span').css('font-size') == '75px' ? '50px' : '75px'
    }, 500, function(){
      if (times_run>6){
        // When the animation completes, make it fade away
        $('.heart').fadeTo( "slow", 0.00 ); //.fadeTo( duration, opacity [, complete ] )
        readyToMatch=true;
      }else{
        if (times_run==0){
          $('.heart').fadeTo( "fast", 1.00 ); //.fadeTo( duration, opacity [, complete ] )
        }
        animateHeart(times_run+1);
      }
      
    });
  }

})
