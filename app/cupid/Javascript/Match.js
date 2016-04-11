$(document).ready(function(){
  // Disable orientation change. 
  // $( window ).orientationchange();
  // $.mobile.orientationChangeEnabled = false;
  $( window ).on( "orientationchange", function( event ) {
    // alerts twice. Probably because the script is loaded multiple times.
    if (window.orientation!="0"){
      alert( "The app may not work in landscape mode. Please change back to portrait mode." );
    }
  });

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
  scr_height = $(window).height() - 44;
  scr_width = $(window).width();
  // div_height = $('.match-page').height();
  // div_width = $('.match-page').width();
  // alert(div_height);
  // alert(div_width);
  // $(".div-overlap").css("height", "100%");
  // $(".div-overlap").css("width", scr_width);
  // $(".match_space").css("margin-top", scr_height * 0.05);
  // $(".person_frame").css("height", scr_width * 0.6);
  // $(".person_frame").css("width", scr_width * 0.5);
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
  // $(".div-hidden").css("left", 0);
  // $(".div-hidden").css("bottom", scr_height);
  // $(".div-hidden").css("margin-top", scr_height);
  $(".heart").css("margin-top", scr_height * 0.5 * 0.8);
  // $(".heart_usr_1").css("margin-top", scr_height * 0.5 * 0.8)
  // $(".heart_beat").css("margin-top", scr_height * 0.5 * 0.8)
  // $(".heart_usr_2").css("margin-top", "25px")

  //receive the first data from the server

  user_img_1 = "/icons/pig1.jpg";
  user_img_2 = "/icons/pig2.jpg";
  user_name_1 = "Noura Li";
  user_name_2 = "John Smith";
  cur_usr_name = "Collin";
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

  // $(".btn-close").click(function(){
  //   usr_data = {'usr_id': 1, 'match_id': false, 'yes': true};
  //   usr_data = JSON.stringify(usr_data);
  //   // alert("h");
  //   $.ajax({
  //     type: "POST",
  //     contentType: "application/json",
  //     dataType: "json",
  //     url: "http://loveisintheair.herokuapp.com/api/match",
  //     data: usr_data,
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     error: function(er) {
  //       var keys = Object.keys(er);
  //       alert(keys);
  //       // console.log(er);
  //       alert(er['error']);
  //       alert(er['getAllResponseHeaders']);
  //       alert(er['status']);
  //     },
  //     success: function(data) {
  //       // alert("yes");
  //       var keys = Object.keys(data);
  //       // alert(keys);
  //       // var receivedData = JSON.parse(data);
  //       // alert(receivedData);
  //       cur_usr_id=data['user_id'];
  //       match_id=data['match_id'];
  //       user_name_1=data['users'][0]['name'];//full name string
  //       user_img_1=data['users'][0]['profile_picture'];// profile picture url
  //       user_name_2=data['users'][1]['name'];
  //       user_img_2=data['users'][1]['profile_picture'];
	// 	  //  // Do something with the user_id and Match ID. Wait for the next user input.
  //     // //  alert(user_name_1);
  //     // //  alert("yes");
	// 		  refreshMatchInfo(user_name_1,user_img_1,user_name_2,user_img_2);
  //       // alert(data['sup']);
  //     }
  //   });
  // });
  //
  $(".btn-checkmark").click(function(){
    if (readyToMatch){
      // SeeMyMatch();

      // var xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() {
      //   if(xhr.readyState ==  XMLHttpRequest.DONE && xhr.status == 200) {
      //       alert(xhr.responseText);
      //   }else{
      //     alert('something bad happened');
      //     alert('xhr.status: '+xhr.status);
      //   }
      // }
      // xhr.open('GET', 'http://localhost:3000/match/hi', true);
      // xhr.send(null);
      // $.post( "http://localhost:3000/api/hi", function( data ) {
      //   $( ".div-hidden" ).html('random shit');
      //   alert( "Load was performed." );
      // });


      // switch readyToMatch to false so that user cannot double click the same button
      readyToMatch=false;
      // change the html to show the name of the two matches. Change it to first name later
      $(".heart").html('<p style="color:#FFFFFF;">'+user_name_1+'<span style="font-size: 75px; color: #990033;">&hearts;</span>'+user_name_2+'</p>');
      //$("#match_screen").css("filter","blur(5px)"); blur doesnt work
      $(".div-hidden").css("background-color", "rgba(0,0,0,0.7)");
      $(".div-hidden").show();
      animateHeart(0);
    }
  });

  // $(".view-result").click(function(){
  //   SeeMyMatch();
  // });

  function SendVote() {

  }

  function RefreshMatch() {
    $('.heart span').stop();
  }

  function SeeMyMatch() {
    usr_data = {'usr_id': 1, 'match_id': false, 'yes': true};
    usr_data = JSON.stringify(usr_data);
    // alert("h");
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: "http://loveisintheair.herokuapp.com/api/match",
      data: usr_data,
      error: function(er) {
        var keys = Object.keys(er);
        alert(keys);
        // console.log(er);
        alert(er['error']);
        alert(er['getAllResponseHeaders']);
        alert(er['status']);
      },
      success: function(data) {
        // alert("yes");
        doanimation(data);
        var keys = Object.keys(data);
        // alert(keys);
        // var receivedData = JSON.parse(data);
        // alert(receivedData);
      //   received_user_id=data['user_id'];
      //   match_id=data['match_id'];
      //   user_name_1=data['users'][0]['name'];//full name string
      //   user_img_1=data['users'][0]['profile_picture'];// profile picture url
      //   user_name_2=data['users'][1]['name'];
      //   user_img_2=data['users'][1]['profile_picture'];
		  //  // Do something with the user_id and Match ID. Wait for the next user input.
      // //  alert(user_name_1);
      // //  alert("yes");
			//   refreshMatchInfo(user_name_1,user_img_1,user_name_2,user_img_2);
        // alert(data['sup']);
      }
    });
  }

  function refreshMatchInfo(user_name_1,user_img_1,user_name_2,user_img_2){
    $(".user_img_1").attr("src", user_img_1);
    $(".user_img_2").attr("src", user_img_2);
    $(".user_name_1").html(user_name_1);
    $(".user_name_2").html(user_name_2);
    $(".cur_usr_name").html(cur_usr_name);
  }

  // function doanimation (data) {
  //   readyToMatch=false;
  //   // change the html to show the name of the two matches. Change it to first name later
  //   $(".heart").html('<p style="color:#FFFFFF;">'+user_name_1+'<span style="font-size: 75px; color: #990033;">&hearts;</span>'+user_name_2+'</p>');
  //   //$("#match_screen").css("filter","blur(5px)"); blur doesnt work
  //   $(".div-hidden").css("background-color", "rgba(0,0,0,0.7)");
  //   $(".div-hidden").show();
  //   // alert(data);
  //   animateHeart(0, data);
  // }
  // function SeeMyMatch() {
  //   usr_data = {'usr_id': cur_usr_id, 'usr_name': cur_usr_name};
  //   $.ajax({
  //     type: "POST",
  //     dataType: "JSON",
  //     url: MyMatchPage,
  //     data: usr_data,
  //     success: page_redirect(res)
  //   });
  // }

  function page_redirect(res) {
    if (res.status == 'success') {
      window.location.href = MyMatchPage;
    }
  }

  function animateHeart(times_run, data) {
    // alert(data);
    $('.heart span').animate({
        fontSize: $('.heart span').css('font-size') == '75px' ? '50px' : '75px'
    }, 500, function(){
      if (times_run>3){
        // When the animation completes, make it fade away
        $('.heart').fadeTo( "slow", 0.00 ); //.fadeTo( duration, opacity [, complete ] )
        $('.div-hidden').fadeTo("slow", 0.00);
        $('.div-hidden').css("display", "none");
        readyToMatch=true;
        cur_usr_id=data['user_id'];
        match_id=data['match_id'];
        user_name_1=data['users'][0]['name'];//full name string
        user_img_1=data['users'][0]['profile_picture'];// profile picture url
        user_name_2=data['users'][1]['name'];
        user_img_2=data['users'][1]['profile_picture'];
		   // Do something with the user_id and Match ID. Wait for the next user input.
      //  alert(user_name_1);
      //  alert("yes");
			  refreshMatchInfo(user_name_1,user_img_1,user_name_2,user_img_2);
      }else{
        if (times_run==0){
          $('.heart').fadeTo( "fast", 1.00 ); //.fadeTo( duration, opacity [, complete ] )
          $('.div-hidden').fadeTo("fast", 1.00);
        }
        animateHeart(times_run+1, data);
      }

    });
  }

})
