function fileChanged() {
	storeSubmissionDatabase("submitForm", false);
	location.reload()
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
		
		// Does not exist. LOG IN FAIL
		if(getUser(null, email, password) == null) {
			loginError("That email password combination does not exist")
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

	$('#submitButton').click(function() {
		$('#myFile').click();
	})
	
	$('#logoutButton').click(function() {
		destroySession(false);
		logOut();
	})
})

$(window).load(function() {
	$(".pageContent").fadeIn(500);
});

function loginError(errorMessage) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Login failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function parseError(errorMessage) {
	$("#errorBox").empty()
	$("#errorBox").append($("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Grading failed.</strong>&nbsp;&nbsp;"+errorMessage+"</div>"))
}

function getGET(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}