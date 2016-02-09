from Tron import *

# Initialize the Networker object that allows getting the field and making moves
networker = Networker()

# We can't print to console, because that channel is used for IO with the environment.
# We therefore print to either debug1.log or debug2.log. The first is for player1, the second for layer two
# Use log() rather than print.
log("This is a python bot")

myX = 0;
myY = 0;
isNorthOK = 0;
isSouthOK = 0;
isWestOK = 0;
isEastOK = 0;

def projectIntoFuture(move, stepsAlive, currX, currY, newGameMap):
	newX = 0;
	newY = 0;
	if currX == 0 and move == west:
		return stepsAlive;
	if currX == 15 and move == east:
		return stepsAlive;
	if currY == 0 and move == south:
		return stepsAlive;
	if currY == 15 and move == north:
		return stepsAlive;
		
	if move == west:
		newX = currX-1;
		newY = currY;
	elif move == north:
		newX = currX;
		newY = currY+1;
	elif move == south:
		newX = currX;
		newY = currY-1;
	elif move == east:
		newX = currX+1;
		newY = currY;
	
	if newGameMap[newY][newX] != empty:
		return stepsAlive;
	
	newGameMap[newY][newX] = me;
	stepsMoveNorth = projectIntoFuture(north, stepsAlive+1, newX, newY, newGameMap);
	stepsMoveSouth = projectIntoFuture(south, stepsAlive+1, newX, newY, newGameMap);
	stepsMoveEast = projectIntoFuture(east, stepsAlive+1, newX, newY, newGameMap);
	stepsMoveWest = projectIntoFuture(west, stepsAlive+1, newX, newY, newGameMap);
	
	x = [0];
	x.append(stepsMoveNorth);
	x.append(stepsMoveSouth);
	x.append(stepsMoveEast);
	x.append(stepsMoveWest);
	best = max(x);
	return best;
	
def doGoodMove(myX, myY, gameMap):
	southDist = projectIntoFuture(south, 0, myX, myY, gameMap);
	northDist = projectIntoFuture(north, 0, myX, myY, gameMap);
	westDist = projectIntoFuture(west, 0, myX, myY, gameMap);
	eastDist = projectIntoFuture(east, 0, myX, myY, gameMap);
	
	things = [0];
	things.append(southDist);
	things.append(northDist);
	things.append(westDist);
	things.append(eastDist);
	best = max(things);
	
	if best == eastDist:
		networker.sendMove(east);
	elif best == westDist:
		networker.sendMove(west);
	elif best == southDist:
		networker.sendMove(south);
	elif best == northDist:
		networker.sendMove(north);

# Execute loop forever (or until game ends)
while True:
	# Get the current map. It is a 2d list of integers.
	# Each int can be the value of one of these variables: north, south, east, west
	gameMap = networker.getMap()
	
	squaresFull = 0;
	
	# Let's find our current position and log it
	for y in range(16):
		for x in range(16):
			if gameMap[y][x] != empty:
				squaresFull = squaresFull + 1;
			if gameMap[y][x] == me:
				log("position: " + str(x) + ", " + str(y));
				myX = x;
				myY = y;
				
	if squaresFull < 18:
		if myX == 0:
			networker.sendMove(north);
		elif myX == 15:
			networker.sendMove(south);
	elif squaresFull < 25:
		if myX < 8:
			if gameMap[myY][myX+1] == empty:
				networker.sendMove(east);
		elif myX > 8:
			if gameMap[myY][myX-1] == empty:
				networker.sendMove(west);
		else:
			doGoodMove(myX, myY, gameMap);
	else:
		doGoodMove(myX, myY, gameMap);
	
	
	