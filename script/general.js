function fileChanged() {
	var score = storeSubmissionDatabase("submitForm", false);
	console.log("score: " + score)
	if (isNaN(score)) parseError()
	else congratsError(score)

	reloadTables()
}

function login(user) {
	$("#loginNav").css("display", "none");
	$("#logoutNav").css("display", "inline");

	$("#submitForm").append("<input type='hidden' name='userID' value='"+user.userID+"'>");
}

function logOut() {
	$("#loginNav").css("display", "inline");
	$("#logoutNav").css("display", "none");

}

function populateSchools() {
	$("#schoolsDropdown").empty()
	var schools = getSchools()
	for(var a = 0; a < schools.length; a++) {
		$("#schoolsDropdown").append("<li><a href='school.php?schoolName="+schools[a]+"'>"+schools[a]+"</a></li>");
	}
}

$(document).ready(function() {
	populateSchools();

	var user = getSession();
	console.log(user);

	// not logged in
	if(user == null) {
		logOut();
	} else {
		login(user)
	}

	$('.dropdown-toggle').dropdown();
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});

	$('.dropdown').on('show.bs.dropdown', function(e){
		var $dropdown = $(this).find('.dropdown-menu');
		var orig_margin_top = parseInt($dropdown.css('margin-top'));
		$dropdown.css({'margin-top': (orig_margin_top + 10) + 'px', opacity: 0}).animate({'margin-top': orig_margin_top + 'px', opacity: 1}, 300, function(){
			$(this).css({'margin-top':''});
		});
	});

	$('.dropdown').on('hide.bs.dropdown', function(e){
		var $dropdown = $(this).find('.dropdown-menu');
		var orig_margin_top = parseInt($dropdown.css('margin-top'));
		$dropdown.css({'margin-top': orig_margin_top + 'px', opacity: 1, display: 'block'}).animate({'margin-top': (orig_margin_top + 10) + 'px', opacity: 0}, 300, function(){
			$(this).css({'margin-top':'', display:''});
		});
	});

	$("#loginButton").click(function() {
		var email = $("#login_user").val();
		var password = $("#login_pass").val();
		
		if(getUser(null, email, password) == null) {
			loginError("Email password combination could not be found.")
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

		var resp = storeUserBackend(email, password, firstName, lastName, false, function(resp) {
			console.log("callback");
			if (resp === "Success") {
				$("#errorBox").empty()
				storeUserSession(null, email, password, false);
				login(getSession());
			} else registerError(resp);
		});

	})

	$("#register_email").keyup(function() {
		var email = $('#register_email').val();
		var ind = email.indexOf("@");
		var domain = email.slice((ind+1),email.length);
		
		console.log("DOMAIN: " + domain);

		var response = "Enter your school email.";
		if (domain === "horacemann.org") response = "Horace Mann School";
		else if (domain === "dalton.org") response = "The Dalton School";
		else if (domain === "stuy.edu") response = "Stuyvesant High School";
		else if (domain === "ecfs.org") response = "Ethical Culture Fieldston School";
		else if (domain === "trinityschoolnyc.org") response = "Trinity School";

		$("#schoolField").html(response);
	})

	$('#submitButton').click(function() {
		$('#myFile').click();
	})
	
	$('#logoutButton').click(function() {
		destroySession(false);
		logOut();
	})

	$("#register_email").val('');
	$("#register_pass").val('');
	$("#register_first").val('');
	$("#register_last").val('');
	$("#login_user").val('');
	$("#login_pass").val('');

	$.material.init()
})

$(window).load(function() {
	$(".pageContent").fadeIn(300);
});

function loginError(errorMessage) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Login failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function registerError(errorMessage) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Registration failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function parseError() {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Grading failed.</strong>&nbsp;&nbsp;Please check your output file and try again.</div>"))
}

function congratsError(score) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Congratulations!</strong>&nbsp;&nbsp;You got a score of <strong>"+score+"</strong>.</div>"))
}

function getGET(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}