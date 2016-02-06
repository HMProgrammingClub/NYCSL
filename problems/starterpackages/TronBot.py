from Tron import *

# Initialize the Networker object that allows getting the field and making moves
networker = Networker()

# Execute loop forever (or until game ends)
while True:
<<<<<<< HEAD
	# Get the current map. It is a 2d list of integers.
	# Each int can be the value of one of these variables: north, south, east, west
	gameMap = networker.getMap()

	# Move north
	networker.sendMove(north)

	# We can't print to console, because that channel is used for IO with the environment.
	# We therefore print to either debug1.log or debug2.log. The first is for player1, the second for layer two
	# Use log() rather than print.
	log("Hello World")