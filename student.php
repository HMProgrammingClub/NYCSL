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
			<h1 id="jHeader">John Cena</h1>
			<p id="jParagraph">WWE School</p>
		</div>
		<div id="info" class="row">
			<div class="col-sm-12">
				<div class="panel panel-default">
					<table class="table well well-sm">
						<thead>
							<tr>
								<th>Competition Name</th>
								<th>Month</th>
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

	<p>NYCSL, or the New York Computer Science League, is a computer programming competition website.  It was created by four programmers, Josh Gruenstein, Luca Koval, Ben Spector, and Michael Truell, during the defhacks hackathon for New York City high school students.  The purpose of NYCSL is to bring NYC highschool programmers together to create and share ideas through competition.  Each month, a new competition with a new problem is created and posted on the website.  Programmers in NYCSL have one month to upload a solution to the problem.  Their solutions are graded and then put up on a leaderboard with other scores from other students from the same school.</p>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="script/general.js"></script>
</body>
</html>
