<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">

	<title>School Leaderboard</title>

	<link href="lib/bootstrap.min.css" rel="stylesheet">

	<link href="style/general.css" rel="stylesheet">
	<link href="style/school.css" rel="stylesheet">
</head>

<body>
	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="jumbotron">
			<h1 id="jHeader">TSP</h1>
			<p id="jParagraph">Herp derp.</p>
		</div>
		<ul class="nav nav-tabs">
			<li role="presentation" class="active">
				<a href="#">Horace Mann</a>
			</li>
			<li role="presentation">
				<a href="#">Stuyvesant</a>
			</li>
			<li role="presentation">
				<a href="#">Bronx Science</a>
			</li>
			<li role="presentation" class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
					Dropdown <span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
				</ul>
			</li>
		</ul>
		<div id="info" class="row">
			<div class="col-sm-4">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">Rules</h3>
					</div>
					<div class="panel-body">These are the rules.</div>
				</div>
			</div>
			<div class="col-sm-8">
				<?php include 'includes/leaderboard.php' ?>
			</div>
		</div>
	</div>

	<?php include 'includes/footer.php'; ?>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="script/general.js"></script>
</body>
</html>
