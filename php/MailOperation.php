<?php
	global $argc, $argv;
	$email = $argv[1];
	$userID = $argv[2];
	$verificationCode = $argv[3];

	mail($email, 
		"Verify Your Account", 
		"Verify your NYCSL account by visiting this link: 104.131.81.214/verify?userID={$userID}&code={$verificationCode}. After that, you can log in.");
?>