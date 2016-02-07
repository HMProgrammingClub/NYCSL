// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
	var addedUser = false;

	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
		console.log(timeStamp() + socket.username + " says: \"" +data +"\"")
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	// MADE BY HENRY LIKE A BOSS
	socket.on('private message', function(data, to) {
		console.log(timeStamp() + socket.username + "says to " + to + ": " + data)
		socket.broadcast.emit('private message', {
			username: socket.username,
			goingTo: to,
			message: data
		});
	});

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {
		if (addedUser) return;

		// store the username in the socket session
		socket.username = username;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
			numUsers: numUsers
		});
		// echo to all clients that a person has connected
		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});

				console.log(timeStamp() +"User: \"" + socket.username + "\" has joined.")
	});

	// when the client emits 'typing', we broadcast it to others
	socket.on('typing', function () {
		socket.broadcast.emit('typing', {
			username: socket.username
		});
	});

	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', function () {
		socket.broadcast.emit('stop typing', {
			username: socket.username
		});
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		if (addedUser) {
			--numUsers;

			console.log(timeStamp() +"User: \"" +socket.username +"\" has left.")
			// echo globally that this client has left
			socket.broadcast.emit('user left', {
				username: socket.username,
				numUsers: numUsers
			});
		}
	});

});

function timeStamp() {
// Create a date object with the current time
	var now = new Date();

// Create an array with the current month, day and time
	var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
	var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// If seconds and minutes are less than 10, add a zero

	for ( var i = 0; i < 3; i++ ) {
		if ( date[i] < 10 ) {
			date[i] = "0" + date[i];
		}
		if ( time[i] < 10 ) {

			time[i] = "0" + time[i];
		}
	}

// Return the formatted string
	return "[" +date.join("/") + " " + time.join(":") +"] "
}
