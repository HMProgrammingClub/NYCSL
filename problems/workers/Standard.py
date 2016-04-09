from Tron import *
import copy
import math
import random

closerToMe = 4
closerToOpponent = 5
equidistant = 6

def getPosition(gameMap):
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == me:
				return (x, y)

def performOnMoves(x, y, gameMap, function):
	function(x-1, y, west, gameMap)
	function(x+1, y, east, gameMap)
	function(x, y+1, north, gameMap)
	function(x, y-1, south, gameMap)

def getMoves(x, y, gameMap, booleanFunction):
	returnList = []

	if booleanFunction(x-1, y, gameMap): returnList.append(west)
	if booleanFunction(x+1, y, gameMap): returnList.append(east)
	if booleanFunction(x, y+1, gameMap): returnList.append(north)
	if booleanFunction(x, y-1, gameMap): returnList.append(south)

	return returnList

def getNumberAround(x, y, gameMap, booleanFunction):
	return len(getMoves(x, y, gameMap, booleanFunction))


def bordersEnemy(x, y, gameMap):
	return getNumberAround(x, y, gameMap, lambda xx, yy, gameMap: gameMap[yy][xx] == opponent if withinBorders(xx, yy) else False) > 0

def getNumWalls(x, y, gameMap):
	return getNumberAround(x, y, gameMap, lambda xx, yy, gameMap: isAcceptable(xx, yy, gameMap) == False)

def withinBorders(x, y):
	return x > -1 and x < 16 and y > -1 and y < 16

def isAcceptable(x, y, gameMap):
	return withinBorders(x, y) and gameMap[y][x] == empty

def floodFill(x, y, matrix):
	counter = 0
	#"hidden" stop clause - not reinvoking for "c" or "b", only for "a".
	if isAcceptable(x, y, matrix):
		counter += 1

		matrix[y][x] = takenByOpponent 
		#recursively invoke flood fill on all surrounding cells:
		if x > 0:
			counter += floodFill(x-1, y, matrix)
		if x < len(matrix[y]) - 1:
			counter += floodFill(x+1, y, matrix)
		if y > 0:
			counter += floodFill(x, y-1, matrix)
		if y < len(matrix) - 1:
			counter += floodFill(x, y+1, matrix)
	return counter

def getDist(x1, y1, x2, y2):
	return math.sqrt((x1-x2)**2 + (y1-y2)**2)

def getPosition(tileValue, gameMap):
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == tileValue:
				return (x, y)

def moveToPosition(move, x, y):
	if move == north: return (x, y+1)
	if move == south: return (x, y-1)
	if move == west: return (x-1, y)
	if move == east: return (x+1, y)

def getVoronoiMap(gameMap):
	opponentX, opponentY = getPosition(opponent, gameMap)
	myX, myY = getPosition(me, gameMap)
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] == empty:
				myDist = getDist(myX, myY, x, y)
				opponentDist = getDist(opponentX, opponentY, x, y)

				if myDist == opponentDist: gameMap[y][x] = equidistant
				elif myDist < opponentDist: gameMap[y][x] = closerToMe
				else: gameMap[y][x] = closerToOpponent

def isEndGame(gameMap):
	emptyCounter = 0
	for row in gameMap: 
		for elem in row: 
			emptyCounter += 1 if elem == empty else 0
	
	emptyPos = getPosition(empty, gameMap)
	floodFillEmpty = floodFill(emptyPos[0], emptyPos[1], copy.deepcopy(gameMap))
	
	logln(str(emptyCounter))
	logln(str(floodFillEmpty))

	if floodFillEmpty != emptyCounter: return True

	return False

def wallHug(gameMap):
	x, y = getPosition(me, gameMap)
	logln(str(x) + " " + str(y))
	
	mostWalls = 0
	bestDirection = north
	wallList = [getNumWalls(x, y+1, gameMap), getNumWalls(x+1, y, gameMap), getNumWalls(x, y-1, gameMap), getNumWalls(x-1, y, gameMap)]

	for a in range(len(wallList)):
		pos = moveToPosition(a, x, y)
		if wallList[a] > mostWalls and wallList[a] < 4 and isAcceptable(pos[0], pos[1], gameMap):
			mostWalls = wallList[a]
			bestDirection = a

	return bestDirection

def floodFillMove(gameMap):
	x, y = getPosition(gameMap)
	opponentPosition = getOpponentPosition(gameMap)
	
	highestfloodFill = -1

	floodFillList = [floodFill(x, y+1, copy.deepcopy(gameMap)), floodFill(x+1, y, copy.deepcopy(gameMap)), floodFill(x, y-1, copy.deepcopy(gameMap)), floodFill(x-1, y, copy.deepcopy(gameMap))]

	for floodFillScore in floodFillList:
		if floodFillScore > highestfloodFill:
			highestfloodFill = floodFillScore
	
	furthestDisance = -1
	bestDirection = north
	for a in range(len(floodFillList)):
		if floodFillList[a] == highestfloodFill:
			pos = moveToPosition(a, x, y)
			dist = getDist(opponentPosition[0], opponentPosition[1], pos[0], pos[1])
			logln(str(dist))
			if dist > furthestDisance:
				furthestDisance = dist
				bestDirection = a

	return bestDirection

def voronoi(gameMap):
	mostVoronoiTerritory = 0
	bestDirection = north

	def countVoronoi(x, y, move, gameMap):
		nonlocal mostVoronoiTerritory, bestDirection
		if isAcceptable(x, y, gameMap) == False or bordersEnemy(x, y, gameMap): return

		gameMap = copy.deepcopy(gameMap)
		getVoronoiMap(gameMap)
		
		voronoiTerritoryCount = 0
		for row in gameMap:
			for elem in row:
				log(str(elem))
				if elem == closerToMe:
					voronoiTerritoryCount += 1
			logln("")
		logln("")

		logln("move: " + str(move) + " count: " + str(voronoiTerritoryCount))
		if voronoiTerritoryCount > mostVoronoiTerritory:
			mostVoronoiTerritory = voronoiTerritoryCount
			bestDirection = move
	x, y = getPosition(me, gameMap)
	
	voronoiMap = getVoronoiMap(copy.deepcopy(gameMap))
	performOnMoves(x, y, gameMap, countVoronoi)

	logln("best: " + str(bestDirection))

	return bestDirection