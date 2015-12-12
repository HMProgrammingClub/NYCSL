<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">

	<title></title>

	<link href="lib/bootstrap.min.css" rel="stylesheet">

	<link href="style/general.css" rel="stylesheet">
	<link href="style/index.css" rel="stylesheet">
</head>

<body>

	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="jumbotron">
			<h1 id="jHeader">TSP</h1>
			<p id="jParagraph">Herp derp.</p>
		</div>
		<div class="row">
			<div class="col-sm-4">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">Rules</h3>
					</div>
					<div class="panel-body">These are the rules.</div>
				</div>
			</div>
			<div class="col-sm-8">
				<div class="panel panel-default">
					<table class="table well well-sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>School</th>
								<th>Distance</th>
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
	<script src="script/general.js"></script>
</body>
</html>
