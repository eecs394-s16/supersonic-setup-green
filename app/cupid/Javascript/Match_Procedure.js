function sendMatch(user_id,match_id,yes) {
	// User ID and match ID is provided by the backend
	// yes is a simple true/false of the user.

	var url = "http://SOME URL FOR OUR SERVER";
	var method = "POST";
	var postData = {'user_id':user_id, 'match_id':match_id, 'yes': yes};

	// You REALLY want async = true.
	// Otherwise, it'll block ALL execution waiting for server response.
	var async = true;

	var request = new XMLHttpRequest();

	// *****************
	// What happens after we receive the server's response.
	// *****************
	request.onreadystatechange = function() {
		// The response should be a new pair of match: that is your user_id and match_id

		if (request.readyState == 4 && request.status == 200) {// HTTP response status, e.g., 200 for "200 OK"
		   var status = request.status;
		   var data = request.responseText; // Returned data, e.g., an HTML document.

		   console.log('Received response status:'.concat(status));
		   console.log('Received response data:'.concat(data));

		   var receivedData = JSON.parse(data);

		   var received_user_id=receivedData['user_id'];
		   var received_match_id=receivedData['match_id'];
		   var received_user0_full_name=receivedData['users'][0]['name'];//full name string
		   var received_user0_profile_picture=receivedData['users'][0]['profile_picture'];// profile picture url
		   var received_user1_full_name=receivedData['users'][1]['name'];
		   var received_user1_profile_picture=receivedData['users'][1]['profile_picture'];
		   // Do something with the user_id and Match ID. Wait for the next user input.

		}
		else{
		   console.log('Received response status:'.concat(status));
		}
	}

	// ***************
	// Actually sends the request to the server.
	// ***************
	request.open(method, url, async);
	request.send(JSON.stringify(postData));
}
