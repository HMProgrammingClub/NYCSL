import sys
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

class Networker:
	def deserializeMap(self, mapString):
		tiles = mapString.split(" ")
		return [tiles[a*16 : (a+1)*16] for a in range(16)]

	def getMap(self):
		return self.deserializeMap(sys.stdin.readline().rstrip("\n"))

	def sendMove(self, move):
		sys.stdout.write(str(move) + "\n")
		sys.stdout.flush()