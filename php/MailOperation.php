<?php
	global $argc, $argv;
	$email = $argv[1];
	$userID = $argv[2];
	$name = $argv[3];
	$message = $argv[4];

	$headers = "From: NYCSL <noreply@nycsl.io>\r\nReply-To: NYCSL <noreply@nycsl.io>\r\nX-Priority: 3\r\nX-Mailer: PHP". phpversion() ."\r\nContent-Type: text/html; charset=ISO-8859-1\r\nOrganization: NYCSL\r\nMIME-Version: 1.0\r\n";

	mail($email, 
		"NYCSL.io Email Confirmation", 
		$message,
		$headers);
?>
