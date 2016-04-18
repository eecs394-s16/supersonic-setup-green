//user data
cur_usr_name = "";
cur_usr_id = "";
user_img_1 = "";
user_img_2 = "";
user_name_1 = "";
user_name_2 = "";
user_id_1 = "";
user_id_2 = "";
match_id = false;
vote = false;
MyMatchPage = "";
readyToMatch=true;//Set to true for now. If false, we cannot click the match button. That means either we have not received a new match yet or we're in animation stage.
ranOutOfMatches=false;

$(document).ready(function(){

  //css auto-adjust according to the screen size
  scr_height = $(window).height() - 44;
  scr_width = $(window).width();
  $(".user_pic").css("height", scr_width * 0.5 * 0.85);
  $(".user_pic").css("width", scr_width * 0.5 * 0.85);
  $(".user_name").css("height", scr_width * 0.5 * 0.25);
  $(".user_name").css("width", scr_width * 0.5 * 0.25);
  $(".btn-select").css("height", scr_width * 0.5 * 0.75 * 0.5);
  $(".btn-select").css("width", scr_width * 0.5 * 0.75 * 0.5);
  $("#selection_part").css("margin-top", scr_height * 0.02);
  $(".div-hidden").css("height", scr_height);
  $(".div-hidden").css("width", scr_width);
  $(".div-hidden").css("z-index", 999);
  $(".div-hidden").css("display", "none");
  $(".div-hidden").css("position", "absolute");
  $(".div-hidden").css("top", 0);
  $(".first_user").css("margin-top", scr_height * 0.5 * 0.5);
  $(".heart_part").css("margin-top", "25px");
  // $(".heart").css("margin-top", scr_height * 0.5 * 0.8);
  $(".name").css("margin-top", scr_width * 0.5);

  var img_dire = true;

  // Get the first pair
  // Specify match_id=false and yes=false to not be recorded by the votes
  // and just get a new pair
  usr_data = {'user_id': 1, 'match_id': false, 'yes': false};
  usr_data = JSON.stringify(usr_data);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "http://loveisintheair.herokuapp.com/api/votes",
    data: usr_data,
    error: function(er) {
      var keys = Object.keys(er);
      // alert(er['status']);
    },
    success: function(data) {
      var keys = Object.keys(data);
      cur_usr_name=data['user_name'];
      match_id=data['match_id'];
      refreshMatchInfo(data);
    }
  });

  $(".img_flip").flip({});

  $(".match-page").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      // $(this).text("You swiped " + direction );

      if (direction === "left" || direction === "right") {
        $('#swipe-directions').hide();
        SubmitMatchVote(false);
      }
    }
  });


  //event triger
  $(".user_1").click(function(){

  });

  $(".user_2").click(function(){

  });

  $(".btn-checkmark").click(function(){
    if (readyToMatch){
      SubmitMatchVote(true);
    }
  });

  $(".view-result").click(function(){
    SubmitMatchVote(true);
  });

  function SendVote() {

  }

  function RefreshMatch() {
    $('.heart span').stop();
  }

  function SubmitMatchVote(yes) {

    usr_data = {'user_id': 1, 'match_id': match_id, 'yes': yes};
    usr_data = JSON.stringify(usr_data);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/api/votes",
      data: usr_data,
      error: function(er) {
        var keys = Object.keys(er);
        // alert(er['status']);
      },
      success: function(data) {
        var keys = Object.keys(data);
        if (yes==true){
          doanimation(data);
        }else{
          refreshMatchInfo(data);
        }
      }
    });
  }

  function refreshMatchInfo(data){
    cur_usr_name=data['user_name'];
    match_id=data['match_id'];
    if (match_id!=false){
      // IF there is a next match
      user_name_1=data['users'][0]['name'];//full name string
      user_img_1=data['users'][0]['profile_picture'];// profile picture url
      user_name_2=data['users'][1]['name'];
      user_img_2=data['users'][1]['profile_picture'];

      if(img_dire === true) {
        $(".user_img_3").attr("src", user_img_1);
      } else {
        $(".user_img_1").attr("src", user_img_1);
      }
      if(img_dire === true) {
        $(".user_img_4").attr("src", user_img_2);
      } else {
        $(".user_img_2").attr("src", user_img_2);
      }
      $(".img_flip").flip(img_dire);
      img_dire = !img_dire;
      $(".user_name_1").html(user_name_1);
      $(".user_name_2").html(user_name_2);
      $(".cur_usr_name").html(cur_usr_name);
    }else{
      // if we ran out of matches
      ranOutOfMatches=true;
      // alert("You've ran out of matches! Ask your friend to download Cupid to have more potential matches");
    }


  }

  function doanimation (data) {
    readyToMatch=false;
    // change the html to show the name of the two matches. Change it to first name later
    // $(".heart").html('<p style="color:#FFFFFF;">'+user_name_1+'<span style="font-size: 75px; color: #990033;">&hearts;</span>'+user_name_2+'</p>');
    $(".user_name_heart_1").html(user_name_1);
    $(".user_name_heart_2").html(user_name_2);
    $(".div-hidden").css("background-color", "rgba(0,0,0,0.7)");
    $(".div-hidden").show();
    animateHeart(0, data);
  }

  function animateHeart(times_run, data) {
    $('.heart span').animate({
        fontSize: $('.heart span').css('font-size') == '75px' ? '50px' : '75px'
    }, 500, function(){
      if (times_run>1.8){
        // When the animation completes, make it fade away
        // $('.heart').fadeTo( "slow", 0.00 ); //.fadeTo( duration, opacity [, complete ] )
        $('.div-hidden').fadeTo("slow", 0.00);
        $('.div-hidden').css("display", "none");
        readyToMatch=true;
        var keys = Object.keys(data);
        // alert(keys)
			  refreshMatchInfo(data);
      }else{
        if (times_run==0){
          // $('.heart').fadeTo( "fast", 1.00 ); //.fadeTo( duration, opacity [, complete ] )
          $('.div-hidden').fadeTo("fast", 1.00);
        }
        animateHeart(times_run+1, data);
      }
    });
  }

})
