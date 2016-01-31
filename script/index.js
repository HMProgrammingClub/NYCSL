var index;

function modalLinkClicked(gameFile) {
	console.log(gameFile)
	$('#gameModal').modal('show');
	begin(gameFile)
}

function populateLeaderboard(problem) {
	problem.submissions.sort(function(a, b) { return parseInt(b.score)-parseInt(a.score) })
	console.log(problem)
	$("#leaderTable").empty()
	for(var a = 0; a < problem.submissions.length; a++) {
		var user = problem.submissions[a].user
		var domAddition = "<tbody id='user" + user.userID + "'><tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+" "+user.lastName+"</a></td><td><a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a></td><td><a class='matchDrop' userID= '"+user.userID+"' href='#'>"+problem.submissions[a].score+"</a></td></tr></tbody>"
		$("#leaderTable").append(domAddition);
	}
}

function displayProblem(index) {
	var problem = getProblemWithIndex(index)
	populateLeaderboard(problem)

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
	});

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
	});

	$(document).on("click",".matchDrop",function(e) {
		var userID = $(this).attr("userID")
		var latestGames = getLatestGamesForUser(userID)
		console.log(latestGames)
		for(var a = 0; a < latestGames.length; a++) {
			var opponentIndex = null
			for(var b = 0; b < latestGames[a].users.length; b++) if(latestGames[a].users[b].userID != userID) opponentIndex = b
			var opponent = getUser(latestGames[a].users[opponentIndex].userID)
			console.log(latestGames[a].users[opponentIndex].rank)
			var gameResult = latestGames[a].users[opponentIndex].rank === "0" ? "Lost" : "Won"
			$("#user"+userID).append("<tr class='gameRow'><td></td><td>vs <a href='student.php?userID="+opponent.userID+"'>"+opponent.firstName+" "+opponent.lastName+"</a></td><td><a href='school.php?schoolName="+opponent.schoolName+"'>"+opponent.schoolName+"</a></td><td><a href='#gameID="+latestGames[a].gameID+"' onclick='modalLinkClicked(\""+latestGames[a].replayFilename+"\")'>"+gameResult+"</a></td></tr>")
		}
		var display = $(this).parent().parent().parent().find(".gameRow").css("display");
		if (display === "none") $(this).parent().parent().parent().find(".gameRow").css("display","table-row")
		else $(this).parent().parent().parent().find(".gameRow").css("display","none")
	});

	if(index == 0) {
		$("#nextButton").css("visibility", "hidden");
		$("#archivedTag").css("display", "none");
	}
	if(index == size-1) {
		$("#backButton").css("visibility", "visible");
	}

	displayProblem(index)

	if(getGET("didVerify") != null) verifySuccess()
	if(getGET("didNotVerify") != null) verifyError()
	if(getGET("didRecover") != null) recoverPasswordSuccess()
	if(getGET("didNotRecover") != null) recoverPasswordError()

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

function recoverPasswordSuccess() {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-info alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Password Changed.</strong>&nbsp;&nbsp;You successfully changed your password!</div>"))
}

function recoverPasswordError() {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Password Change Failed.</strong>&nbsp;&nbsp;There was a problem changing your password. If this issue is persistent, email <a href='mailto:contact@nycsl.io'>contact@nycsl.io</a>.</div>"))
}