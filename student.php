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
</head>

<body>

	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="jumbotron">
			<h1 id="jHeader">John Doe</h1>
			<p id="jParagraph">Horace Mann School</p>
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

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/student.js"></script>
</body>
</html>
