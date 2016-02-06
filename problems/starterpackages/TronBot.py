from Tron import *

networker = Networker()

# We can't print to console, because that channel is used for IO with the environment.
# We therefore print to either debug1.log or debug2.log. The first is for player1, the second for layer two
# Use log() rather than print.
log("This is a python bot")

while True:
	# Get the current map. It is a 2d list of integers.
	# Each int can be the value of one of these variables: north, south, east, west
	gameMap = networker.getMap()

	# Let's find our current position and log it
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == me:
				log("position: " + str(x) + ", " + str(y))

	# Send your move
	networker.sendMove(north)