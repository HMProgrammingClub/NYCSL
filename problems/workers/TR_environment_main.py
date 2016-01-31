from TR_environment_networking import Networker
from enum import Enum
import time
import copy
import sys

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

class Point:
	def __init__(self, x, y):
		self.x = x
		self.y = y

networker = Networker()
if len(sys.argv) >= 2:
	for a in range(-2, 0):
		print(sys.argv[a])
		networker.startPlayer(sys.argv[a])
else:
	# Network initialization
	for a in range(2):
		networker.startPlayer(input("Enter the start command for the player " + str(a) + ":"))

# Map setup
width = 16
height = 16
gameMap = [[Tile.empty.value for a in range(width)] for b in range(height)]

# Place pieces on map
positions = []
positions.append(Point(int(width/2), 0))
positions.append(Point(int(width/2), height-1))

gameMap[positions[0].y][positions[0].x] = Tile.player1.value
gameMap[positions[1].y][positions[1].x] = Tile.player2.value

# Game loop
frames = []
isDone = False
winner = -1
while isDone == False:
	frames.append(copy.deepcopy(gameMap))
	for a in range(2):
		try:
			gameMap[positions[a].y][positions[a].x] = Tile.takenByPlayer1.value if a == 0 else Tile.takenByPlayer2.value
			move = networker.frameNetworking(gameMap, a)
			if move == Direction.north.value: positions[a].y += 1
			elif move == Direction.south.value: positions[a].y -= 1
			elif move == Direction.east.value: positions[a].x += 1
			elif move == Direction.west.value: positions[a].x -= 1

			# check if legitimate move
			if positions[a].x >= width or positions[a].y >= height or positions[a].x < 0 or positions[a].y < 0 or gameMap[positions[a].y][positions[a].x] == Tile.takenByPlayer1.value or gameMap[positions[a].y][positions[a].x] == Tile.takenByPlayer2.value:
				print("Player " + str(a+1) + " moved off of the map!")
				winner = 1 + (0 if a == 1 else 1)
				isDone = True
				break

			gameMap[positions[a].y][positions[a].x] = Tile.player1.value if a == 0 else Tile.player2.value
		except Exception as e:
			print("There was an error while running the game!")
			print(str(e))
			winner = 1 + (0 if a == 1 else 1)
			isDone = True
			break

# Cleanup
print("Player " + str(winner) + " won!")
networker.killAll()

contents = "%d %d %d\n" % (width, height, len(frames))
for frame in frames: contents += " ".join(str(tile) for row in frame for tile in row) + "\n"
filename = "/var/www/nycsl/problems/workers/" + str(int(time.time()*10)) + ".trn"
open(filename, "w").write(contents)

print("Output file is stored at " + filename)
