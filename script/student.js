function populateLeaderboard(userID) {
	var submissions = getUserSubmissions(userID)
	for(var a = 0; a < submissions.length; a++) {
		var problem = getProblem(submissions[a].problemID)
		$("#leaderboard").append($("<tr><th scope='row'><a href='index.php?problemID="+problem.problemID+"'>"+problem.problemFullName+"</a></th><td>"+getRankOfSubmission(submissions[a].submissionID)+"</td><td>"+submissions[a].score+"</td></tr>"))
	}
}

function reloadTables() {
	var userID = parseInt(getGET("userID"))
	populateLeaderboard(userID)
}

$(document).ready(function() {
	var userID = parseInt(getGET("userID"))
	if(isNaN(userID) == true) {
		window.location.href = "index.php";
	}
	var user = getUser(userID, null, null)

	$("#jHeader").html(user.firstName + " " + user.lastName)
	$("#jParagraph").html("<a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a>")

	populateLeaderboard(userID)
})