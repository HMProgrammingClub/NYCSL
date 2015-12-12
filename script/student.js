function populateStudentLeaderboard(userID) {
	var submissions = getUserSubmissions(userId)
	for(var a = 0; a < submissions.length; a++) {
		var problem = getProblem(submissions[a].problemID)
		var school = getSchool(submissions[a].)
	}
}

$(document).ready(function() {
	var userID = parseInt(getGet("userID"))
	if(isNaN(userID) == true) {
		window.location.href = "index.php";
	}
	var user = getUser(userID, null, null)

	$("jHeader").html(user.firstName + " " + user.lastName)
	$("jParagraph").html(user.schoolName)


})