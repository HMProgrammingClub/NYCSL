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

lastDirection = None

turn = 0

while True:
	gameMap = networker.getMap()
	x, y = getPosition(gameMap)
	if turn == 9:
		if isAcceptable(x-1, y, gameMap):
			networker.sendMove(west)
			lastDirection = west
		else:
			networker.sendMove(east)
			lastDirection = east
	else:
		acceptableMoves = []
		if isAcceptable(x, y-1, gameMap): acceptableMoves.append(south)
		if isAcceptable(x, y+1, gameMap): acceptableMoves.append(north)
		if isAcceptable(x-1, y, gameMap): acceptableMoves.append(west)
		if isAcceptable(x+1, y, gameMap): acceptableMoves.append(east)

		# Move north
		if lastDirection != None and lastDirection in acceptableMoves: networker.sendMove(lastDirection)
		elif len(acceptableMoves) > 0: 
			if south in acceptableMoves and y >= 8:
				networker.sendMove(south)
				lastDirection = south
			elif north in acceptableMoves and y < 8:
				networker.sendMove(north)
				lastDirection = north
			else: 
				networker.sendMove(acceptableMoves[0])
				lastDirection = acceptableMoves[0]
		else: 
			networker.sendMove(north)

	turn += 1