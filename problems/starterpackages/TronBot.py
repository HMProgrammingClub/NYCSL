from TR_networking import *

networker = Networker()
while True:
	gameMap = networker.getMap()
	networker.sendMove(Direction.west.value)