from enum import Enum
import time
import copy
import sys
import subprocess
from threading import Thread

def monitorFile(connection, queue):
	while True:
		try:
			line = connection.readline()
		except:
			break

		if not line:
			queue.append(None)
			break
		line = line.rstrip("\n")
		queue.append(line)

class Networker:
	def __init__(self):
		self.processes = []
		self.stdoutQueues = []
		self.stderrQueues = []

	def startPlayer(self, command):
		self.processes.append(subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, universal_newlines=True, shell=True))

		self.stdoutQueues.append([])
		self.stderrQueues.append([])
		
		stdoutMonitor = Thread(target=monitorFile, args=(self.processes[-1].stdout, self.stdoutQueues[-1]))
		stdoutMonitor.daemon = True
		stdoutMonitor.start()

		stderrMonitor = Thread(target=monitorFile, args=(self.processes[-1].stderr, self.stderrQueues[-1]))
		stderrMonitor.daemon = True
		stderrMonitor.start()

	def initialNetworking(self):
		for a in range(len(self.processes)):
			self.processes[a].stdin.write(str(a+1) + "\n")
			self.processes[a].stdin.flush()
		
	def serializeMap(self, map, isSecond):
		returnString = ""
		for row in map:
			for tile in row:
				returnString += str(tile if isSecond == False else tile-1 if tile == 2 or tile == 4 else tile+1 if tile != 0 else 0) + " "
		return returnString
		
	def frameNetworking(self, map, isSecond):
		self.processes[isSecond].stdin.write(self.serializeMap(map, isSecond) + "\n")
		self.processes[isSecond].stdin.flush()

		# Return move
		startingTime = time.time()
		while len(self.stdoutQueues[isSecond]) == 0:
			time.sleep(0.01)
			if time.time() - startingTime > 2.5: return None
		return int(self.stdoutQueues[isSecond].pop())

	def killAll(self):
		for a in range(len(self.processes)):
			self.processes[a].stdin.write("KILL\n")
			self.processes[a].stdin.flush()
			self.processes[a].kill()

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

networker.initialNetworking()

# Map setup
width = 16
height = 16
gameMap = [[Tile.empty.value for a in range(width)] for b in range(height)]

# Place pieces on map
positions = []
positions.append(Point(0, 0))
positions.append(Point(width-1, height-1))

gameMap[positions[0].y][positions[0].x] = Tile.player1.value
gameMap[positions[1].y][positions[1].x] = Tile.player2.value

# Game loop
frames = []
isDone = False
isTied = False
winner = -1

frames.append(copy.deepcopy(gameMap))
while isDone == False:
	for a in range(2):
		try:
			move = networker.frameNetworking(copy.deepcopy(frames[-1]), a)
			gameMap[positions[a].y][positions[a].x] = Tile.takenByPlayer1.value if a == 0 else Tile.takenByPlayer2.value
			
			if move == None or move < 0 or move > 3:
				if move == None: print("Player " + str(a+1) + " timed out!")
				else: print("Player " + str(a+1) + " sent us a move that is not between 0 and 3!")
				
				winner = 1 + (0 if a == 1 else 1)
				if isDone == True: isTied = True
				isDone = True
				continue

			if move == Direction.north.value: positions[a].y += 1
			elif move == Direction.south.value: positions[a].y -= 1
			elif move == Direction.east.value: positions[a].x += 1
			elif move == Direction.west.value: positions[a].x -= 1

			# check if legitimate move
			if positions[a].x >= width or positions[a].y >= height or positions[a].x < 0 or positions[a].y < 0 or gameMap[positions[a].y][positions[a].x] != Tile.empty.value:
				if positions[a].x >= width or positions[a].y >= height or positions[a].x < 0 or positions[a].y < 0: print("Player " + str(a+1) + " fell off the map!")
				elif gameMap[positions[a].y][positions[a].x] == Tile.player1.value or gameMap[positions[a].y][positions[a].x] == Tile.player2.value: print("Player " + str(a+1) + " collided with another player!")
				else: print("Player " + str(a+1) + " collide with a tile that has already been taken!")
				
				winner = 1 + (0 if a == 1 else 1)
				if isDone == True: isTied = True
				isDone = True
				continue

			gameMap[positions[a].y][positions[a].x] = Tile.player1.value if a == 0 else Tile.player2.value
		except Exception as e:
			print("There was an error while running the game!")
			print(str(e))
			winner = 1 + (0 if a == 1 else 1)

			if isDone == True: isTied = True
			isDone = True
			continue
	frames.append(copy.deepcopy(gameMap))
# Cleanup
if isTied == True: print("The game ended in a tie!")
else: print("Player " + str(winner) + " won!")
networker.killAll()

contents = "%d %d %d\n" % (width, height, len(frames))
for frame in frames: contents += " ".join(str(tile) for row in frame for tile in row) + "\n"
filename = str(int(time.time()*10)) + ".trn"
open("/var/www/nycsl/problems/workers/workingPath/"+filename, "w").write(contents)

print("Output file is stored at " + filename)