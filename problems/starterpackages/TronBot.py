from Tron import *
#We can't print to console, because that channel is used for IO with the environment.
#We therefore create a file and output to that. Use debug rather than print.

networker = Networker()
while True:
	gameMap = networker.getMap()
	log("python test")

	# actually send it
	networker.sendMove(north)