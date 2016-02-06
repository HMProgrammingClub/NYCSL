import sys
import time

north = 0
east = 1
south = 2
west = 3

empty = 0
me = 1
opponent = 2
takenByMe = 3
takenByOpponent = 4

debug = None

def log(string):
	if debug != None: debug.write(str(string)+"\n")

class Networker:
	def __init__(self):
		global debug
		debug = open("debug"+sys.stdin.readline().strip()+".log", "w")

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