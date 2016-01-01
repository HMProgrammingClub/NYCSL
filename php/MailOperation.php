<?php
	global $argc, $argv;
	$email = $argv[1];
	$userID = $argv[2];
	$verificationCode = $argv[3];
	$name = $argv[4];

	mail($email, 
		"NYCSL.io Registration Confirmation", 
		"Click <a href='http://nycsl.io/verify.php?code={$verificationCode}&userID={$userID}'>here</a> to confirm registration for $name at NYCSL.io. If you did not register, ignore this message.",
		"From: www-data@nycsl.io\r\nReply-To: www-data@nycsl.io\r\nX-Mailer: PHP/".phpversion()."\r\nContent-Type: text/html; charset=ISO-8859-1\r\n");
?>
