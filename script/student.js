function populateStudentLeaderboard(userID) {
	var submissions = getUserSubmissions(userID)
	for(var a = 0; a < submissions.length; a++) {
		var problem = getProblem(submissions[a].problemID)
		$("#leaderboard").append($("<tr><th scope='row'>"+problem.problemName+"</th><td></td><td>"+submissions[a].score+"</td></tr>"))
	}
}

$(document).ready(function() {
	var userID = parseInt(getGET("userID"))
	if(isNaN(userID) == true) {
		window.location.href = "index.php";
	}
	var user = getUser(userID, null, null)

	$("#jHeader").html(user.firstName + " " + user.lastName)
	$("#jParagraph").html(user.schoolName)

	populateStudentLeaderboard(userID)

})