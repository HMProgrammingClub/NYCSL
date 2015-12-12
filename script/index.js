function populateLeaderboard() {
	console.log("start");
	$("#leaderboard").empty()
	var entries = getProblemSubmissions();
	console.log("entry")
	console.log(entries);
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		var user = getUser(entry.userID);
		console.log(entry.score);
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+"</a></td><td><a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a></td></a><td>"+entry.score+"</td></tr>"))
	}
}

$(function() {
	
	$('.dropdown-toggle').dropdown();
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});
});

// FOR TESTING PURPOSES
$( document ).ready(function() {
	console.log( "ready!" );
	populateLeaderboard();
});