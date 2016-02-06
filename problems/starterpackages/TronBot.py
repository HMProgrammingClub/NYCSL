from Tron import *
#We can't print to console, because that channel is used for IO with the environment.
#We therefore create a file and output to that. Use debug rather than print.

# Initialize the Networker object that allows getting the field and making moves
networker = Networker()

# Execute loop forever (or until game ends)
while True:
	# Get a current map of the playing field
	gameMap = networker.getMap()

	# Move north
	networker.sendMove(north)

	# Print 'Hello World' and a newline to the debug file
	log("Hello World")
