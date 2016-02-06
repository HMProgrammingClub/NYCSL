import sys
import time

north = 0
east = 1
south = 2
west = 3

empty = 0
myCar = 1
opponentCar = 2
takenByMe = 3
takenByOpponent = 4

debug = open("debug.log", "w")
def log(string):
	debug.write(str(string)+"\n")

class Networker:
	def deserializeMap(self, mapString):
		tiles = [int(tile) for tile in mapString.split(" ")]
		map = [tiles[a*16 : (a+1)*16] for a in range(16)]
		return map

	def getMap(self):
		message = sys.stdin.readline().strip()
		if message == "KILL": sys.exit()
		return self.deserializeMap(message)

	def sendMove(self, move):
		sys.stdout.write(str(move) + "\n")
		sys.stdout.flush()