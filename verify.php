<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="shortcut icon" href="img/favicon.ico" />

	<script src="lib/jquery.min.js"></script>
	<script src="script/backend.js"></script>
	<script type="text/javascript">
		function getGET(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		if(verifyEmail(getGET("userID"), getGET("code")) != null) {
			window.location.href = "index.php?didVerify=1"
		} else {
			window.location.href = "index.php?didNotVerify=1"
		}
	</script>

	<title>NYCSL School Leaderboards</title>
</head>
	This page will redirect when we are done verifying your email
</html>