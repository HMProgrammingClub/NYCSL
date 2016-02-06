from Tron import *
#We can't print to console, because that channel is used for IO with the environment.
#We therefore create a file and output to that. Use debug rather than print.

networker = Networker()
index = 0
direction = 0
log("test")

def findMe(gameMap):
	for i in range(len(gameMap)):
		for j in range(len(gameMap[i])):
			if (gameMap[i][j] == 1):
				return (i, j)

gameMap = networker.getMap()
row, col = findMe(gameMap)

log( str(row) + ", " +str(col))

if row == 0: direction = 3
else: direction = 0

log(direction)

networker.sendMove(direction)

while True:
	index += 1
	gameMap = networker.getMap()
	row, col = findMe(gameMap)
	log( str(row) + ", " +str(col))
	if ((col == 0 or col == 15) and (row == 0 or row == 15)):
		direction = (direction+1) %4

	# actually send it
	networker.sendMove(direction)