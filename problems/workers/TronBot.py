from Tron import *
from Standard import *
import random

networker = Networker()
logln("This is the main TronBot")

while True:
	gameMap = networker.getMap()
	if isEndGame(gameMap):
		logln("END GAME")
		networker.sendMove(wallHug(gameMap))
	else: 
		networker.sendMove(voronoi(gameMap))