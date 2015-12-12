var index;
var schoolName;

function populateLeaderboard(problemID, schoolName, problemIndex) {
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
	schoolName = getGET("schoolName");
	if(schoolName == null || schoolName === "" || schoolName === " ") {
		schoolName = getSchools()[0];
	}
	console.log("scho: "+schoolName)
	populateSchoolTabs(schoolName);

	index = parseInt(getGET("problemIndex"));
	if(isNaN(index) == true || index == null || index === "" || index === " ") {
		index = 0;
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
		});
		$(this).addClass("active")
		schoolName = $(this).attr("schoolName")
		populateLeaderboard(getProblemWithIndex(index).problemID, schoolName, index)
	});

	renderMathInElement(document.getElementById("rulesPanelBody"));
})