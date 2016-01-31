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
</head>

<body>
	<div class="container">
		<?php include 'includes/navbar.php'; ?>
		<div id="archivedTag" class="alert alert-info" role="alert"> <strong>This problem is archived.</strong> You can't submit answers anymore.</div>
		<div class="pageContent">
			<?php include 'includes/jumbo.php'; ?>
			<div class="row">
				<div class="col-sm-5">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">Problem</h3>
						</div>
						<div class="panel-body" id="rulesPanelBody">
							
						</div>
					</div>
				</div>
				<div class="col-sm-7">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">Leaderboard</h3>
						</div>

						<table class="table well well-sm" id="leaderTable">
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>School</th>
									<th>Score</th>
								</tr>
							</thead>
							<tbody id="leaderboard">
							</tbody>
						</table>
						<button type="button" id="loadBtn" class="btn btn-secondary btn-block">Load More</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php 
		include 'includes/game.php'; 
		include 'includes/footer.php'
	?>

	<script src="lib/jquery.min.js"></script>
	<script src="lib/bootstrap.min.js"></script>
	<script src="lib/material.min.js"></script>
	<script src="lib/ripples.min.js"></script>
	<script src="lib/katex.min.js"></script>
	<script src="lib/auto-render.min.js"></script>
	<script src="script/backend.js"></script>
	<script src="script/general.js"></script>
	<script src="script/index.js"></script>
	<script id="vs" type="x-shader/vertex"> 
 
		attribute vec2 position;
		attribute vec3 vcolor;
		varying vec3 color;

		void main()
		{
			gl_Position = vec4(position, 1.0, 1.0);
			color = vcolor;
		}

	</script> 

	<script id="fs" type="x-shader/fragment"> 

		varying vec3 color;

		void main(void)
		{
			gl_FragColor = vec4(color, 1.0);
		}

	</script> 
	<script> 
 
		/**
		 * Provides requestAnimationFrame in a cross browser way.
		 * paulirish.com/2011/requestanimationframe-for-smart-animating/
		 */
		window.requestAnimationFrame = window.requestAnimationFrame || (
		function()
		{
			return  window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function( callback, element) {
						window.setTimeout(callback, 1000 / 60);
					};
		})();

		var canvas, 
				gl,
				width, height, numFrames, full_game,
				turn_number, counter,
				vertex_buffer, color_buffer,
				blankColor, player1Color, player2Color, dimFactor,
				vertex_locations, player1Color, player2Color,
				vertex_shader, fragment_shader, 
				currentProgram,
				vertex_position, color_position,
				parameters = {  start_time  : new Date().getTime(), 
								time        : 0, 
								screenWidth : 0, 
								screenHeight: 0 };

		function begin(data) {
			var meta = data.split("\n")[0].split(" ")
			var restOfFile = data.substring(data.indexOf("\n") + 1).replace(/[^0-9]/g, "");
			var w = meta[0]
			var h = meta[1]
			var nf = meta[2]
			var fc = restOfFile
			console.log(restOfFile.length);
			console.log(restOfFile);
			console.log(w + " " + h + " " + nf + " " + fc.length);
			
			vertex_shader = document.getElementById('vs').textContent;
			fragment_shader = document.getElementById('fs').textContent;

			canvas = document.querySelector('canvas');
			
			//Get width, height, and number of frames from file. Note that those are already declared as global variables.
			width = w;
			height = h;
			numFrames = nf;
			console.log(fc);
			
			//Parse 1D array:
			full_game = [];
			var loc = 0;
			for(var a = 0; a < numFrames; a++) {
				var frame = [];
				for(var b = 0; b < height * width; b++) {
					frame.push(fc[loc]);
					loc++;
				}
				full_game.push(frame);
			}
			
			//Set turn number to be 0;
			turn_number = 0;
			counter = 0;

			//Initialise WebGL
			try {
				gl = canvas.getContext('experimental-webgl');
			} catch(error) { }

			if (!gl) {
				throw "cannot create webgl context";
			}
			
			vl = [];
			var dx = 2.0 / width, dy = 2.0 / height, xSize = 0.4 * dx, ySize = 0.4 * dy;
			for(var yPos = -1 + (dy / 2); yPos < 1; yPos += dy) {
				for(var xPos = -1 + (dx / 2); xPos < 1; xPos += dx) {
					vl.push(xPos - xSize);
					vl.push(yPos - ySize);
					vl.push(xPos + xSize);
					vl.push(yPos + ySize);
					vl.push(xPos + xSize);
					vl.push(yPos - ySize);
					vl.push(xPos - xSize);
					vl.push(yPos - ySize);
					vl.push(xPos + xSize);
					vl.push(yPos + ySize);
					vl.push(xPos - xSize);
					vl.push(yPos + ySize);
				}
			}
			var vertex_locations = new Float32Array(vl);
			
			//Get player colors from file.
			player1Color = new Float32Array([ 1.0, 0.0, 0.0 ]);
			player2Color = new Float32Array([ 0.0, 0.0, 1.0 ]);
			blankColor = new Float32Array([ 0.5, 0.5, 0.5 ]);
			dimFactor = 0.3;

			//Create Vertex buffer
			vertex_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, vertex_locations, gl.STATIC_DRAW);
			//Create Color buffer
			color_buffer = gl.createBuffer();

			//Create Program
			currentProgram = createProgram(vertex_shader, fragment_shader);
			
			//Find vertex and color positions.
			vertex_position = gl.getAttribLocation(currentProgram, "position");
			color_position = gl.getAttribLocation(currentProgram, "vcolor");

			onWindowResize();
			window.addEventListener('resize', onWindowResize, false);
			
			animate();
		}

		function createProgram(vertex, fragment) {

			var program = gl.createProgram();

			var vs = createShader(vertex, gl.VERTEX_SHADER);
			var fs = createShader('#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER);

			if (vs == null || fs == null) return null;

			gl.attachShader(program, vs);
			gl.attachShader(program, fs);

			gl.deleteShader(vs);
			gl.deleteShader(fs);

			gl.linkProgram(program);

			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

				alert("ERROR:\n" +
				"VALIDATE_STATUS: " + gl.getProgramParameter(program, gl.VALIDATE_STATUS) + "\n" +
				"ERROR: " + gl.getError() + "\n\n" +
				"- Vertex Shader -\n" + vertex + "\n\n" +
				"- Fragment Shader -\n" + fragment);

				return null;

			}

			return program;

		}

		function createShader(src, type) {

			var shader = gl.createShader(type);

			gl.shaderSource(shader, src);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

				alert((type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " SHADER:\n" + gl.getShaderInfoLog(shader));
				return null;

			}

			return shader;
		}

		function onWindowResize(event) {
			canvas.width = 400;
			canvas.height = 400;

			parameters.screenWidth = canvas.width;
			parameters.screenHeight = canvas.height;

			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		function animate() {
			if(turn_number < numFrames - 1) requestAnimationFrame(animate);
			counter++;
			if(turn_number < numFrames - 1 && counter % 10 == 0) turn_number++;
			nextFrame();
			render();
		}
		
		function nextFrame() {
			console.log(turn_number);
			var map = full_game[turn_number];
			
			//console.log(map);
			
			var colors = [];
			for(var a = 0; a < map.length; a++) {
				for(var b = 0; b < 6; b++) { //Fill in for each vertex:
					if(map[a] == 1) {
						colors.push(player1Color[0]);
						colors.push(player1Color[1]);
						colors.push(player1Color[2]);
					}
					else if(map[a] == 3) {
						colors.push(player1Color[0] * dimFactor);
						colors.push(player1Color[1] * dimFactor);
						colors.push(player1Color[2] * dimFactor);
					}
					else if(map[a] == 2) {
						colors.push(player2Color[0]);
						colors.push(player2Color[1]);
						colors.push(player2Color[2]);
					}
					else if(map[a] == 4) {
						colors.push(player2Color[0] * dimFactor);
						colors.push(player2Color[1] * dimFactor);
						colors.push(player2Color[2] * dimFactor);
					}
					else {
						colors.push(blankColor[0]);
						colors.push(blankColor[1]);
						colors.push(blankColor[2]);
					}
				}
			}
			
			gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
		}

		function render() {

			if (!currentProgram) return;

			parameters.time = new Date().getTime() - parameters.start_time;

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			//Load program into GPU

			gl.useProgram(currentProgram);

			//Set values to program variables

			//Render geometry
			gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
			gl.vertexAttribPointer(vertex_position, 2, gl.FLOAT, false, 0, 0);
			gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
			gl.vertexAttribPointer(color_position, 3, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(vertex_position);
			gl.enableVertexAttribArray(color_position);
			gl.drawArrays(gl.TRIANGLES, 0, 1536); //256 * 6
			gl.disableVertexAttribArray(vertex_position);
			gl.disableVertexAttribArray(color_position);
		}
 
		</script> 
</body>
</html>
