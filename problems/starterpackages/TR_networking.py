import sys

class Networker:
	def deserializeMap(self, mapString):
		tiles = mapString.split(" ")
		return [tiles[a*16 : (a+1)*16] for a in range(16)]

	def getMap(self):
		return deserializeMap(sys.stdin.readline().rstrip("\n"))

	def sendMove(self, move):
		sys.stdout.write(str(move) + "\n")
		sys.stdout.flush()