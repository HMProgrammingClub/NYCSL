var url = "../php/"

function getUser(userID, email, password) {
	if(userID != null && password != null) {
		var result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {userID: userID, password: password}
	    });
	    console.log(result);
	} else if(email != null && password != null) {
		var result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {email: email, password: password}
	    });
	    console.log(result);
	} else {
		console.log("Your arguements are messed up");
	}
}

function storeUserBackend(email, password, firstName, lastName, schoolName) {

}

function storeUserSession(userID, email, password) {

}

function getProblem(problemID) {

}

function getProblemSubmissions(problemID) {

}

function getUserSubmissions(userID) {

}

function getSubmission(submissionID) {

}