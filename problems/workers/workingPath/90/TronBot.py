from Tron import *
import random

def getPosition(gameMap):
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == me:
				return (x, y)


def getNumberAround(x, y, gameMap, booleanFunction):
	num = 0

	withinBorders = lambda x, y: x > -1 and x < 16 and y > -1 and y < 16

	if withinBorders(x-1, y) and booleanFunction(x-1, y, gameMap): num += 1
	if withinBorders(x+1, y) and booleanFunction(x+1, y, gameMap): num += 1
	if withinBorders(x, y-1) and booleanFunction(x, y-1, gameMap): num += 1
	if withinBorders(x, y+1) and booleanFunction(x, y+1, gameMap): num += 1

	return num

def bordersEnemy(x, y, gameMap):
	return getNumberAround(x, y, gameMap, lambda x, y, gameMap: gameMap[y][x] == opponent) > 0

def getNumWalls(x, y, gameMap):
	if isAcceptable(x, y, gameMap) == False: return 5
	
	numberAround = getNumberAround(x, y, gameMap, lambda x, y, gameMap: isAcceptable(x, y, gameMap) == False)
	if bordersEnemy(x, y, gameMap): numberAround += 1
	return numberAround


def isAcceptable(x, y, gameMap):
	return x > -1 and x < 16 and y > -1 and y < 16 and gameMap[y][x] == empty


networker = Networker()
log("This is a python bot")

lastDirection = None

turn = 0

while True:
	gameMap = networker.getMap()
	x, y = getPosition(gameMap)
	
	mostWalls = 0
	bestDirection = north

	wallList = [getNumWalls(x, y+1, gameMap), getNumWalls(x+1, y, gameMap), getNumWalls(x, y-1, gameMap), getNumWalls(x-1, y, gameMap)]
	logln(str(wallList))
	for a in range(len(wallList)):
		if wallList[a] > mostWalls and wallList[a] < 4:
			mostWalls = wallList[a]
			bestDirection = a
	logln(bestDirection)
	networker.sendMove(bestDirection)

	turn += 1