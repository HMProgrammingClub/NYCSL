from TR_environment_networking import Networker
from enum import Enum

class Direction(Enum):
	north = 0
	east = 1
	south = 2
	west = 3

class Tile(Enum):
	empty = 0
	player1 = 1
	player2 = 2
	takenByPlayer1 = 3
	takenByPlayer2 = 4

# Network initialization
networker = Networker()
for a in range(2):
	networker.startPlayer(input("Enter the start command for the player " + str(a) + ":"))

# Map setup
width = 16
height = 16
gameMap = [[a for a in range(width)] for b in range(height)]

# Place pieces on map
positions = []
positions[0] = Point(width/2, 0)
positions[1] = Point(width/2, height-1)

gameMap[positions[0].y][positions[0].x] = Tile.player1
gameMap[positions[1].y][positions[1].x] = Tile.player2

# Game loop
isDone = False
winner = -1
while isDone == False:
	for a in range(2):
		try:
			gameMap[positions[a].y][positions[a].x] = Tile.takenByPlayer1 if a == 0 else Tile.takenByPlayer2
			move = networker.frameNetworking(gameMap, a)
			if move == Direction.north: positions[a] += 1
			elif move == Direction.south: positions[a] -= 1
			elif move == Direction.east: positions[a] += 1
			elif move == Direction.west: positions[a] -= 1

			# check if legitimate move
			if positions[a].x >= width or positions[a].y >= height or positions[a].x < 0 or positions[a].y < 0 or gameMap[positions[a].y][positions[a].x] == Tile.takenByPlayer1 or gameMap[positions[a].y][positions[a].x] == Tile.takenByPlayer2:
				print("Player " + str(a) + " moved off of the map!")
				winner = 1 if winner == 2 else 2
				isDone = False
				break
		except:
			isDone = True
			break

# Cleanup
print("Player " + winner + " won!")
networker.killAll()