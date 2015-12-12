function fileChanged() {
	storeSubmissionDatabase("submitForm", false);
}

function login(user) {
	$("#loginNav").css("display", "none");
	$("#logoutNav").css("display", "inline");

	$("#submitForm").append("<input type='hidden' name='userID' value='"+user.userID+"'>");
	
	$('#submitButton').click(function() {
    	$('#myFile').click();
	})
	
	$('#logoutButton').click(function() {
    	destroySession(false);
    	logOut();
	})
}

function logOut() {
	$("#loginNav").css("display", "inline");
	$("#logoutNav").css("display", "none");

	$("#loginButton").click(function() {
		var email = $("#login_user").val();
		var password = $("#login_pass").val();

		// Does not exist. LOG IN FAIL
		if(getUser(null, email, password) == null) {
			console.log("log in fail");
		} else {
			storeUserSession(null, email, password, false);
			console.log(getSession());
			login(getSession());
		}
	})
	$("#registerButton").click(function() {
		var email = $("#register_email").val();
		var password = $("#register_pass").val();
		var firstName = $("#register_first").val();
		var lastName = $("#register_last").val();
		var schoolName = $("#register_school").val();
		console.log(email+""+password+firstName+lastName+schoolName)

		storeUserBackend(email, password, firstName, lastName, schoolName, false);
		storeUserSession(null, email, password, false);
		console.log(getSession())
		login(getSession());
	})
}

$(document).ready(function() {
	renderMathInElement(document.getElementById("rulesPanelBody"));
	var user = getSession();
	console.log(user);

	// not logged in
	if(user == null) {
		logOut();
	} else {
		login(user)
	}
})

$(function() {
	$('.dropdown-toggle').dropdown();
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});
});

function loginError(errorMessage) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Login failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}