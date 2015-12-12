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

function storeUserSession(userID, email, password, async) {
	if(userID != null && password != null) {
		var result = $.ajax({
			url: url+"session", 
			async: async,
			method: "POST",
			data: {userID: userID, password: password}
	    });
	} else if(email != null && password != null) {
		var result = $.ajax({
			url: url+"session", 
			async: async,
			method: "POST",
			data: {email: email, password: password},
			success: function(result) {
				console.log(result)
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseText);
				console.log(thrownError);
			}
	    });
	} else {
		console.log("Your arguements are messed up");
	}
}

function getSession() {
	var result = $.ajax({
		url: url+"session", 
		async: false,
		method: "GET"
    });
	return result.responseJSON;
}

function destroySession(async) {
	var result = $.ajax({
		url: url+"session", 
		async: async,
		method: "DELETE"
    });
}

function getProblem(problemID) {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
    });
    return result.responseJSON;
}

function getProblemSubmissions(problemID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
    });
    return result.responseJSON;
}

function getUserSubmissions(userID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {userID: userID}
    });
    return result.responseJSON;
}

function getSubmission(submissionID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {submissionID: submissionID}
    });
    return result.responseJSON;
}

// FORM MUST HAVE: userID, outputFile
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