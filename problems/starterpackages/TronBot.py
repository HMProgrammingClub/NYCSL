from Tron import *

#We can't print to console, because that channel is used for IO with the environment.
#We therefore create a file and output to that. Use log rather than print.
log("test")

networker = Networker()
index = 0
while True:
	index += 1
	gameMap = networker.getMap()
	networker.sendMove(west)