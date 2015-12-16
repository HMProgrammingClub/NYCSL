<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" href="img/favicon.ico" />

	<title>Student Page</title>

	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<link href="lib/bootstrap.min.css" rel="stylesheet">
	<link href="lib/bootstrap-material-design.css" rel="stylesheet">
	<link href="lib/ripples.min.css" rel="stylesheet">
	<link rel="stylesheet" href="lib/katex.min.css">

	<link href="style/general.css" rel="stylesheet">
	<link href="style/school.css" rel="stylesheet">
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
	<script src="lib/material.min.js"></script>
	<script src="lib/ripples.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/student.js"></script>
</body>
</html>
