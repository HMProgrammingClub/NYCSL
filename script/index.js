var index;

function populateLeaderboard(problemID) {
	$("#leaderboard").empty()
	var entries = getProblemSubmissions(problemID);
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		var user = getUser(entry.userID);
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+" "+user.lastName+"</a></td><td><a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a></td></a><td>"+entry.score+"</td></tr>"))
	}
}

function displayProblem(index) {
	var problem = getProblemWithIndex(index)
	populateLeaderboard(problem.problemID)

    $("#jHeader").empty()
	$("#jHeader").append(problem.problemFullName);
	$("#jParagraph").empty()
	$("#jParagraph").append(problem.problemDescription);

	var result = $.ajax({
		url: "problems/descriptions/"+problem.problemName+".html", 
		async: true,
		method: "GET",
		success: function(result) {
			$("#rulesPanelBody").empty()
			$("#rulesPanelBody").append(result);
		}
    });
}

$(function() {
	
	$('.dropdown-toggle').dropdown();
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});
});

function reloadTables() {
	displayProblem(index)
}

$( document ).ready(function() {
	index = parseInt(getGET("problemIndex"));
	if(isNaN(index) == true || index == null || index === "" || index === " ") {
		index = parseInt(getGET("problemID"));
		if(isNaN(index) == true || index == null || index === "" || index === " ") {
			index = 0;
		} else {
			index = problemIDToIndex(index)
		}
	}
	var size = getProblemsSize();
	$("#backButton").click(function() {
		index++;
		if(index == size-1) {
			$("#backButton").css("visibility", "hidden");
		}
		if(index == 1) {
			$("#nextButton").css("visibility", "visible");
			$("#archivedTag").css("display", "block");
		}

		displayProblem(index)
	})
	$("#nextButton").click(function() {
		index--;
		if(index == 0) {
			$("#nextButton").css("visibility", "hidden");
			$("#archivedTag").css("display", "none");
		}
		if(index == size-2) {
			$("#backButton").css("visibility", "visible");
		}

		displayProblem(index)
	})

	if(index == 0) {
		$("#nextButton").css("visibility", "hidden");
		$("#archivedTag").css("display", "none");
	}
	if(index == size-1) {
		$("#backButton").css("visibility", "visible");
	}

	displayProblem(index)

	console.log("ver: "+getGET("didVerify"))
	if(getGET("didVerify") != null) verifySuccess()
	if(getGET("didNotVerify") != null) verifyError()

	renderMathInElement(document.getElementById("rulesPanelBody"));
});

function verifySuccess() {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Email Verification Success.</strong>&nbsp;&nbsp;Your email has been verified. You may now log in.</div>"))
}

function verifyError() {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Email Verification Failed.</strong>&nbsp;&nbsp;There was a problem verifying your email.</div>"))
}