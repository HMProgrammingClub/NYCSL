<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">

	<title>Student Page</title>

	<link href="lib/bootstrap.min.css" rel="stylesheet">

	<link href="style/general.css" rel="stylesheet">
	<link href="style/school.css" rel="stylesheet">

	<link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="img/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
	<link rel="manifest" href="img/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="img/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
</head>

<body>

	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="pageContent">
			<div class="jumbotron">
				<h1 id="jHeader"></h1>
				<p id="jParagraph"></p>
			</div>
			<div id="info" class="row">
				<div class="col-sm-12">
					<div class="panel panel-default">
						<table class="table well well-sm">
							<thead>
								<tr>
									<th>Competition Name</th>
									<th>Place</th>
									<th>Score</th>
								</tr>
							</thead>
							<tbody id="leaderboard">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/student.js"></script>
</body>
</html>
