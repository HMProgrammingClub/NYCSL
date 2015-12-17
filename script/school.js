var index;
var schoolName;

function populateLeaderboard(problemID, schoolName, problemIndex) {
	$("#leaderboard").empty()
	var entries = getProblemSubmissionsWithSchool(problemID, schoolName);
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		var user = getUser(entry.userID);
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td><a href='student.php?userID="+user.userID+"'>"+user.firstName+" "+user.lastName+"</a></td><td>"+entry.score+"</td></tr>"))
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

function reloadTables() {
	populateLeaderboard(getProblemWithIndex(index).problemID, schoolName, index)
}

function displayProblem(index, schoolName) {
	var problem = getProblemWithIndex(index)
	populateLeaderboard(problem.problemID, schoolName, index)

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

$(document).ready(function() {
	schoolName = getGET("schoolName");
	if(schoolName == null || schoolName === "" || schoolName === " ") {
		schoolName = getSchools()[0];
	}
	populateSchoolTabs(schoolName);

	index = parseInt(getGET("problemIndex"));
	if(isNaN(index) == true || index == null || index === "" || index === " ") {
		index = 0;
	}
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

	displayProblem(index, schoolName)

	$('.schoolTab').click(function() {
		$(".schoolTab").each(function(schoolIndex) {
  			$(this).removeClass("active")
  			$(this).css("color","#606060")
		});
		$(this).addClass("active")
		$(this).css("color","#ffffff")
		schoolName = $(this).attr("schoolName")
		populateLeaderboard(getProblemWithIndex(index).problemID, schoolName, index)
	});

	renderMathInElement(document.getElementById("rulesPanelBody"));
})