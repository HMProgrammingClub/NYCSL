var url = "php/"

function getUser(userID, email, password) {
	var params = {}
	if(userID != null) params.userID = userID;
	if(email != null) params.email = email;
	if(password != null) params.password = password;

	var result = $.ajax({
		url: url+"user", 
		async: false,
		method: "GET",
		data: params,
		success: function(result) {
			console.log(result)
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText)
		}
	});

	return result.responseJSON;
}

function storeUserBackend(email, password, firstName, lastName, async, callback) {
	var result = $.ajax({
		url: url+"user", 
		async: async,
		method: "POST",
		data: {email: email, password: password, firstName: firstName, lastName: lastName, async: async},
		success: function (data) {

			callback(data);            
		}
	});
}

function getGameFile(gameID,callback) {
	console.log("problems/storage/"+gameID)
	$.ajax({
		url: "problems/storage/"+gameID,
		async: false,
		method: "GET",
		success: function(data) {
			console.log("data: " + data)
			callback(data)
		}
	});
}

function getLatestGamesForUser(userID) {
	var result = $.ajax({
		url: url+"game",
		async: false,
		method: "GET",
		data: {userID: userID, limit: 5}
	});
	return result.responseJSON;
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
			data: {email: email, password: password}
		});
	} else {

	}
}

function getSession() {
	var result = $.ajax({
		url: url+"session", 
		async: false,
		method: "GET",
		contentType: "application/json; charset=utf-8",
		data: {}
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

function getProblemSubmissionsWithSchool(problemID, schoolName) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {problemID: problemID, schoolName: schoolName}
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

function getSchools() {
	var result = $.ajax({
		url: url+"schools", 
		async: false,
		method: "GET"
	});
	return result.responseJSON;
}

function getProblemWithIndex(index) {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {index: index}
	});
	return result.responseJSON;
}

function getProblemsSize() {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {size: 1}
	});
	return result.responseJSON;
}

function getRankOfSubmission(submissionID) {
	var result = $.ajax({
		url: url+"rank", 
		async: false,
		method: "GET",
		data: {submissionID: submissionID}
	});
	return result.responseJSON;
}

function problemIDToIndex(problemID) {
	var result = $.ajax({
		url: url+"toIndex", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
	});
	return result.responseJSON;
}

// FORM MUST HAVE: userID, outputFile
function storeSubmissionDatabase(formID) {
	var formData = new FormData($("#"+formID)[0]);
	var result = $.ajax({
		url: url+"submission", 
		async: false,
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
			console.log(xhr.responseText)
		}
	})
	return result.responseJSON;
}

function verifyEmail(userID, verificationCode) {
	var result = $.ajax({
		url: url+"verify", 
		async: false,
		method: "POST",
		data: {userID: userID, code: verificationCode}
	});

	return result.responseJSON;
}

function sendRecoveryEmail(email) {
	var result = $.ajax({
		url: url+"recover", 
		async: false,
		method: "POST",
		data: {email: email}
	});
	console.log(result)
	return result.responseJSON;
}

function recoverEmail(userID, recoveryCode, password) {
	var result = $.ajax({
		url: url+"recover", 
		async: false,
		method: "POST",
		data: {userID: userID, code: recoveryCode, password: password}
	});

	return result.responseJSON;
}
