var index;

function populateLeaderboard(problemID) {
	console.log("start");
	$("#leaderboard").empty()
	var entries = getProblemSubmissions(problemID);
	console.log("entry")
	console.log(entries);
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		var user = getUser(entry.userID);
		console.log(entry.score);
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+"</a></td><td><a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a></td></a><td>"+entry.score+"</td></tr>"))
	}
}

function displayProblem(index) {
	var problem = getProblemWithIndex(index)
	populateLeaderboard(problem.problemID)

	var result = $.ajax({
		url: "problems/descriptions/header"+problem.problemName+".html", 
		async: true,
		method: "GET",
		success: function(result) {
			$("#jumbotron").empty()
			$("#jumbotron").append(result);
		}
    });

	var result = $.ajax({
		url: "problems/descriptions/body"+problem.problemName+".html", 
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
	console.log("ind"+index)
	var size = getProblemsSize();
	$("#backButton").click(function() {
		index++;
		if(index == size-1) {
			$("#backButton").css("display", "none");
		}
		if(index == 1) {
			$("#nextButton").css("display", "inline");
		}

		displayProblem(index)
	})
	$("#nextButton").click(function() {
		index--;
		if(index == 0) {
			$("#nextButton").css("display", "none");
		}
		if(index == size-2) {
			$("#backButton").css("display", "inline");
		}

		displayProblem(index)
	})

	if(index == 0) {
		$("#nextButton").css("display", "none");
	}
	if(index == size-1) {
		$("#backButton").css("display", "none");
	}

	displayProblem(index)

	renderMathInElement(document.getElementById("rulesPanelBody"));
});