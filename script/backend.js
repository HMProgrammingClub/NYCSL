var url = "php/"
getUser(1, null, "test");
function getUser(userID, email, password) {
	if(userID != null && password != null) {
		var result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {userID: userID, password: password}
	    });
	    return result.responseJSON;
	} else if(email != null && password != null) {
		var result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {email: email, password: password}
	    });
	    return result.responseJSON;
	} else {
		console.log("Your arguements are messed up");
	}
}

function storeUserBackend(email, password, firstName, lastName, schoolName, async) {
	var result = $.ajax({
		url: url+"user", 
		async: async,
		method: "POST",
		data: {email: email, password: password, firstName: firstName, lastName: lastName, schoolName: schoolName, async: async}
    });
}

function storeUserSession(userID, email, password) {

}

function getProblem(problemID) {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
    });
}

function getProblemSubmissions(problemID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
    });
}

function getUserSubmissions(userID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {userID: userID}
    });
}

function getSubmission(submissionID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {submissionID: submissionID}
    });
}

// FORM MUST HAVE: userID, problemID, outputFile
function storeSubmissionDatabase(formID, async) {
	var formData = new FormData($("#"+formID)[0]);
	$.ajax({
		url: url+"submission", 
		async: async,
		method: "POST",
		data: formData,
		processData: false,
		contentType: false,
		xhr: function() {
			var myXhr = $.ajaxSettings.xhr();
			return myXhr;
		},
		success: function(result) {
			console.log(result)
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
		}
	})
}