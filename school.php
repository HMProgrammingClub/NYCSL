<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" href="img/favicon.ico" />

	<title>NYCSL School Leaderboards</title>

	<link href="lib/bootstrap.min.css" rel="stylesheet">

	<link href="style/general.css" rel="stylesheet">
	<link href="style/school.css" rel="stylesheet">
</head>

<body>
	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="pageContent">
			<div class="jumbotron" id="jumbotron"></div>
			<div class="row">
				<div class="col-sm-5">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">Rules</h3>
						</div>
						<div class="panel-body" id="rulesPanelBody">
							
						</div>
					</div>
				</div>
				<div class="col-sm-7">
					<ul class="nav nav-tabs" id="schoolTabs"></ul>
					<table class="table well well-sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
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

	<?php include 'includes/footer.php'; ?>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="lib/katex.min.js"></script>
	<script src="lib/auto-render.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/school.js"></script>
</body>
</html>
