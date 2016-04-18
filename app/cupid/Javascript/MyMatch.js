// Note: don't know why document.ready does not work. Random comments I found online that might not be true:
// cannot use document.ready function because it's jquery not javascript. It behaves differently in mobile setting.

$(document).ready(function(){
  usr_data = JSON.stringify({'user_id': 2}); //Assuming user_id = 1 for now.

  $.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    url: "http://loveisintheair.herokuapp.com/mymatch",
    data: usr_data,
    error: function(er) {
      var keys = Object.keys(er);
      // alert(er['status']);
    },
    success: function(data) {
      var mymatch=data['mymatch'];

      var table = document.getElementById("myMatchTable");
      table.innerHTML="";
      for (i = 0; i<mymatch.length; i++){
        var row = table.insertRow(i);


        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = "<td style=\"width:50%;border-collapse:collapse;\"><img style=\"padding-left:5%;padding-top:5%;height:50%;width:90%;\" src=\""+
          mymatch[i]["user_2_pic"]
          +"\"><figcaption style=\"position:relative;left:60px;\">"+ mymatch[i]["user_2_first_name"]+" "+ mymatch[i]["user_2_last_name"]+
          "</figcaption></td>";
        cell2.innerHTML = "<td style=\"border-collapse: collapse;\"><p style=\"position:relative;bottom:30px;left:5px;\"><strong>"+ mymatch[i]["num_votes"]
          + " people</strong> think you're a match!</p> <button class=\"button button-positive button-block btn-login\" onclick=\"fbLinkClick("+mymatch[i]["user_2_fb_id"]+")\">View Profile</button> </td>";
      }
    }
  });
})


function fbLinkClick(user_id){
  supersonic.app.openURL("https://www.facebook.com/"+user_id);
  return true;
}
