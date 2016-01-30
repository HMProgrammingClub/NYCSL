function fileChanged() {
	var score = storeSubmissionDatabase("submitForm", false);
	if (isNaN(score)) parseError(score)
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
	$(".pageContent").css("display", "none");
	populateSchools();

	var user = getSession();

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

	$("#loginForm input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$('#loginButton').trigger('click');
		}
	});

	$("#registerForm input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$('#registerButton').trigger('click');
		}
	});

	$("#loginButton").click(function() {
		var email = $("#login_user").val();
		var password = $("#login_pass").val();
		
		if(getUser(null, email, password) == null) {
			loginError("Email password combination could not be found.")
		} else {
			storeUserSession(null, email, password, false);
			login(getSession());
		}
	})

	$("#recoverButton").click(function() {
		var email = $("#forgotMail").val();
		if(getUser(null, email, null) == null) {
			$("#noEmailRecoveryAlert").css("display", "block");
		} else {
			$("#noEmailRecoveryAlert").css("display", "none");
			$('#forgotModal').modal('hide');
			sendRecoveryEmail(email);
		}
	});
	
	$("#registerButton").click(function() {
		var email = $("#register_email").val();
		var password = $("#register_pass").val();
		var firstName = $("#register_first").val();
		var lastName = $("#register_last").val();

		var resp = storeUserBackend(email, password, firstName, lastName, false, function(resp) {
			if (resp === "Success") {
				$("#messageBox").empty()
				storeUserSession(null, email, password, false);
				verifyAccountMessage();
			} else registerError(resp);
		});

	})

	$("#register_email").keyup(function() {
		var email = $('#register_email').val();
		var ind = email.indexOf("@");
		var domain = email.slice((ind+1),email.length);
		
		var response = "Enter your school email.";
		if (domain === "horacemann.org") response = "Horace Mann School"
		else if (domain === "dalton.org") response = "The Dalton School"
		else if (domain === "stuy.edu") response = "Stuyvesant High School"
		else if (domain === "ecfs.org") response = "Ethical Culture Fieldston School"
		else if (domain === "trinityschoolnyc.org") response = "Trinity School"
		else if (domain === "bxscience.edu") response = "Bronx Science"
		else if (domain === "riverdale.edu") response = "Riverdale Country School"

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

	$("a").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		if (linkLocation.indexOf("#") == -1) $(".pageContent").fadeOut(200, redirectPage);
	});

	function redirectPage() {
		window.location = linkLocation;
	}
});

function loginError(errorMessage) {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Login failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function verifyAccountMessage() {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-info alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Verify Your Account.</strong>&nbsp;&nbsp;Your registration was sucessful. Visit your email to verify your account! You have to do this before you log in.</div>"))
}

function registerError(errorMessage) {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Registration failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function parseError(errorMessage) {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Grading failed.</strong>&nbsp;&nbsp;Error message: \""+errorMessage+".\" Please check your submission file and try again.</div>"))
}

function congratsError(score) {
	$("#messageBox").empty()
	$("#messageBox").append($("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Congratulations!</strong>&nbsp;&nbsp;You got a score of <strong>"+score+"</strong>.</div>"))
}

function getGET(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}