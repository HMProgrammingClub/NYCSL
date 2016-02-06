from TR_networking import *

#We can't print to console, because that channel is used for IO with the environment.
#We therefore create a file and output to that. Use debug rather than print.
debug = open("debug-" + str(int(round(time.time()))) + ".log", "w")

networker = Networker()
while True:
	gameMap = networker.getMap()
	networker.sendMove(Direction.west.value)