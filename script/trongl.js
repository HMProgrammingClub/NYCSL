window.requestAnimationFrame = window.requestAnimationFrame ||(
function() {
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
		turn_number, counter, play,
		vertex_buffer, color_buffer,
		blankColor, wallColor, player1Color, player2Color, dimFactor,
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
	
	vertex_shader = document.getElementById('vs').textContent;
	fragment_shader = document.getElementById('fs').textContent;

	canvas = document.querySelector('canvas');
	
	//Get width, height, and number of frames from file. Note that those are already declared as global variables.
	width = w;
	height = h;
	numFrames = nf;
	
	//Parse 1D array:
	full_game = [];
	var loc = 0;
	for(var a = 0; a < numFrames; a++) {
		var frame = [];
		for(var rowIndex = 0; rowIndex < height; rowIndex++) {	
			var row = [];
			for(var columnIndex = 0; columnIndex < width; columnIndex++) {
				row.push(fc[loc]);
				loc++;
			}
			row.reverse();
			frame = frame.concat(row);
		}
		frame.reverse();
		full_game.push(frame);
	}
	console.log(full_game);
	
	//Add canvas listener:
	play = true;
	document.addEventListener("keydown", keyFunc);
	
	//Set turn number to be 0;
	turn_number = 0;
	counter = 0;

	//Initialise WebGL
	try {
		gl = canvas.getContext('experimental-webgl');
	} catch(error) { }

	if(!gl) {
		throw "cannot create webgl context";
	}
	
	vl = [];
	var dx = 2.0 / width, dy = 2.0 / height, xSize = 0.4 * dx, ySize = 0.4 * dy;
	for(var yPos = 1 - (dy / 2); yPos > -1; yPos -= dy) {
		for(var xPos = -1 +(dx / 2); xPos < 1; xPos += dx) {
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
	wallColor = new Float32Array([ 0.2, 0.2, 0.2 ]);
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

function keyFunc(e) {
	console.log(e.keyCode);
	if(e.keyCode == 37) {
		if(turn_number > 0) turn_number--;
		play = false;
	}
	else if(e.keyCode == 39) {
		if(turn_number < numFrames - 1) turn_number++;
		play = false;
	}
	else if(e.keyCode == 32) {
		play = !play;
	}
}

function createProgram(vertex, fragment) {

	var program = gl.createProgram();

	var vs = createShader(vertex, gl.VERTEX_SHADER);
	var fs = createShader('#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER);

	if(vs == null || fs == null) return null;

	gl.attachShader(program, vs);
	gl.attachShader(program, fs);

	gl.deleteShader(vs);
	gl.deleteShader(fs);

	gl.linkProgram(program);

	if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {

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

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

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
	requestAnimationFrame(animate);
	counter++;
	if(play && turn_number < numFrames - 1 && counter % 12 == 0) turn_number++;
	nextFrame();
	render();
}

function nextFrame() {
	var map = full_game[turn_number];
	
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
			else if(map[a] == 0) {
				colors.push(blankColor[0]);
				colors.push(blankColor[1]);
				colors.push(blankColor[2]);
			}
			else if(map[a] == 5) {
				colors.push(wallColor[0]);
				colors.push(wallColor[1]);
				colors.push(wallColor[2]);
			}
		}
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
}

function render() {

	if(!currentProgram) return;

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
