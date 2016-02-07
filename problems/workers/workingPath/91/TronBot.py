from Tron import *
import random

def getPosition(gameMap):
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == me:
				return (x, y)

def isAcceptable(x, y, gameMap):
	return x > -1 and x < 16 and y > -1 and y < 16 and gameMap[y][x] == empty


networker = Networker()
log("This is a python bot")

while True:
	gameMap = networker.getMap()
	x, y = getPosition(gameMap)
	acceptableMoves = []
	if isAcceptable(x, y-1, gameMap): acceptableMoves.append(south)
	if isAcceptable(x, y+1, gameMap): acceptableMoves.append(north)
	if isAcceptable(x-1, y, gameMap): acceptableMoves.append(west)
	if isAcceptable(x+1, y, gameMap): acceptableMoves.append(east)

	# Move north
	if len(acceptableMoves) > 0: networker.sendMove(acceptableMoves[0])
	else: networker.sendMove(north)