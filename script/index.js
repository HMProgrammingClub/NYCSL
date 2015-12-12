$(function() {
	$('.dropdown-toggle').dropdown();
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});
});

// FOR TESTING PURPOSES
$( document ).ready(function() {
	console.log( "ready!" );
});