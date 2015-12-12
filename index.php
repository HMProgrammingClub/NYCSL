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
  		<div class="panel panel-default">
	  		<div class="panel-heading">Leaderboard</div>
	  		<table id="leaderboard" class="table">
	  			<thead>
	  				<th>#</th>
	  				<th>Name</th>
	  				<th>Distance</th>
	  			</thead>
	  			<tbody id="leaderboard">
	  				<tr>
	  					<th scope="row">1</th>
	  					<th>Joshua Gruenstein</th>
	  					<td>106991</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">2</th>
	  					<th>Ben Spector</th>
	  					<td>107031</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">3</th>
	  					<th>Jonathan Mendelson</th>
	  					<td>115095</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">4</th>
	  					<th>Henry Wildermuth</th>
	  					<td>115581</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">5</th>
	  					<th>Nick Keirstead</th>
	  					<td>118583</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">6</th>
	  					<th>Aman Sanger</th>
	  					<td>119889</td>
	  				</tr>
	  				<tr>
	  					<th scope="row">7</th>
	  					<th>Nicholas Carrero</th>
	  					<td>533372</td>
	  				</tr>
	  			</tbody>
	  		</table>
	  	</div>
  	</div>

    <script src="lib/jquery.min.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="script/general.js"></script>
</body>
</html>
