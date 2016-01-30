from TR_environment_networking import Networker

EMPTY = 0
PLAYER_1 = 1
PLAYER_2 = 2
TAKEN_BY_PLAYER_1 = 3
TAKEN_BY_PLAYER_2 = 4

NORTH = 0
EAST = 1
SOUTH = 2
WEST = 3

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

gameMap[positions[0].y][positions[0].x] = PLAYER_1
gameMap[positions[1].y][positions[1].x] = PLAYER_1

# Game loop
isDone = False
winner = -1
while isDone == False:
	for a in range(2):
		try:
			gameMap[positions[a].y][positions[a].x] = TAKEN_BY_PLAYER_1 if a == 0 else TAKEN_BY_PLAYER_2
			move = networker.frameNetworking(gameMap, a)
			if move == NORTH: positions[a] += 1
			elif move == SOUTH: positions[a] -= 1
			elif move == EAST: positions[a] += 1
			elif move == WEST: positions[a] -= 1

			# check if legitimate move
			if positions[a].x >= width or positions[a].y >= height or positions[a].x < 0 or positions[a].y < 0 or gameMap[positions[a].y][positions[a].x] == TAKEN_BY_PLAYER_1 or gameMap[positions[a].y][positions[a].x] == TAKEN_BY_PLAYER_2:
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