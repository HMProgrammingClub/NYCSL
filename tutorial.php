<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" href="img/favicon.ico" />

	<title>NYCSL Home</title>

	<link href="lib/bootstrap.min.css" rel="stylesheet">
	<link href="lib/bootstrap-material-design.css" rel="stylesheet">
	<link href="lib/ripples.min.css" rel="stylesheet">
	<link rel="stylesheet" href="lib/katex.min.css">

	<link href="style/general.css" rel="stylesheet">

  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>

<body>
	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div class="pageContent">
      <div class="row">
				<div class="col-sm-12">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h1 class="panel-title" id="header"></h1>
						</div>
						<div class="panel-body" id="paragraph">

						</div>
  				</div>
        </div>
		</div>
	</div>

	<?php
		include 'includes/footer.php';
	?>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="lib/material.min.js"></script>
	<script src="lib/ripples.min.js"></script>
	<script src="lib/katex.min.js"></script>
	<script src="lib/auto-render.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/tutorial.js"></script>
</body>
</html>
