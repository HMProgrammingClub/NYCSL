function populateSchoolTabs() {
	var school = getGET("schoolName");
	$("#schoolTabs").empty()
	var schools = getSchools()
	for(var a = 0; a < schools.length; a++) {
		if (schools[a] === school) {
			$("#schoolTabs").append("<li role='presentation' class='schoolTab active'><a href='#' id='tab"+schools[a]+"'>"+schools[a]+"</a></li>");
		} else {
			$("#schoolTabs").append("<li role='presentation' class='schoolTab'><a href='#' id='tab"+schools[a]+"'>"+schools[a]+"</a></li>");
		}
	} populateLeaderboard(school);
}

function populateLeaderboard(schoolName) {

}

$(document).ready(function() {
	populateSchoolTabs();
	$('.schoolTab').click(function() {
		$(".schoolTab").each(function(index) {
  			$(this).removeClass("active")
		});
		$(this).addClass("active")
	});
})
