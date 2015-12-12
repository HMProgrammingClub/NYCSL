function populateLeaderboard() {
	$("#leaderboard").empty()
	var entries = getOrderedEntries()
	for(var a = 0; a < entries.length; a++) {
		var entry = entries[a]
		$("#leaderboard").append($("<tr><th scope='row'>"+(a+1)+"</th><td>"+entry.name+"</td><td>"+entry.distance+"</td></tr>"))
	}
}