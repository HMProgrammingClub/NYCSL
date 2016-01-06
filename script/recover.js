function getGET(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {
	var userID = getGET("userID");
	var recoveryCode = getGET("code");

	$("#recoButton").click(function() {
		var pass = $("#passField").val();
		var result = recoverEmail(userID, recoveryCode, pass)
		if(result == null) window.location.href = "index.php?didNotRecover=1"
		else window.location.href = "index.php?didRecover=1"
	})
})
