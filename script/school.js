function populateLeaderboard(problemID, schoolName) {
	console.log("start");
	$("#leaderboard").empty()
	console.log(problemID)
	console.log(schoolName)
	var entries = getProblemSubmissionsWithSchool(problemID, schoolName);
	console.log("entry")
	console.log(entries);
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		var user = getUser(entry.userID);
		console.log(entry.score);
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+"</a></td><td><a href='school.php?schoolName="+user.schoolName+"'>"+user.schoolName+"</a></td></a><td>"+entry.score+"</td></tr>"))
	}
}

function populateSchoolTabs(school) {
	$("#schoolTabs").empty()
	var schools = getSchools()
	for(var a = 0; a < schools.length; a++) {
		if (schools[a] === school) {
			$("#schoolTabs").append("<li role='presentation' class='schoolTab active' schoolName='"+schools[a]+"'><a href='#' id='tab"+schools[a]+"'>"+schools[a]+"</a></li>");
		} else {
			$("#schoolTabs").append("<li role='presentation' class='schoolTab' schoolName='"+schools[a]+"'><a href='#' id='tab"+schools[a]+"'>"+schools[a]+"</a></li>");
		}
	}
}

function displayProblem(index, schoolName) {
	var problem = getProblemWithIndex(index)
	populateLeaderboard(problem.problemID, schoolName)

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

$(document).ready(function() {

	var schoolName = getGET("schoolName");
	if(schoolName == null) {
		schoolName = getSchools()[0];
	}
	populateSchoolTabs(schoolName);

	var index = 0;
	var size = getProblemsSize();
	$("#backButton").click(function() {
		index++;
		if(index == size-1) {
			$("#backButton").css("display", "none");
		}
		if(index == 1) {
			$("#nextButton").css("display", "inline");
		}

		displayProblem(index, schoolName)
	})
	$("#nextButton").click(function() {
		index--;
		if(index == 0) {
			$("#nextButton").css("display", "none");
		}
		if(index == size-2) {
			$("#backButton").css("display", "inline");
		}

		displayProblem(index, schoolName)
	})

	if(index == 0) {
		$("#nextButton").css("display", "none");
	}
	if(index == size-1) {
		$("#backButton").css("display", "none");
	}

	displayProblem(0, schoolName)

	$('.schoolTab').click(function() {
		$(".schoolTab").each(function(schoolIndex) {
  			$(this).removeClass("active")
		});
		$(this).addClass("active")
		schoolName = $(this).attr("schoolName")
		populateLeaderboard(index, schoolName)
	});

	renderMathInElement(document.getElementById("rulesPanelBody"));
})