import sys
import math
import json

for arg in sys.argv:
	filename = arg

input = open('../problems/input/rm.txt', 'r')
names = []
for line in input:
	line = line.rstrip()
	names.append(line)

namesSet = set(names)

finalList = []
alreadyUsed = []

with open(filename) as fileIn:
	for line in fileIn:
		line = line.strip()
		listy = []
		for w in line.split(' '):
			w = w.rstrip()
			if w in namesSet:
				for name in alreadyUsed:
					if name == w:
						print(json.dumps({"isError": True, "message": "Used a name more than once"}))
						sys.exit(-1)
				listy.append(w)
				alreadyUsed.append(w)
			else:
				print(json.dumps({"isError": True, "message": "Used a name that is not in the input file"}))
				sys.exit(-1)
		if len(listy) != 4:
			print(json.dumps({"isError": True, "message": "You have a room with " + str(len(listy)) + " roommates. All rooms must have exactly 4 roommates"}))
			sys.exit(-1)
		finalList.append(listy)

if len(alreadyUsed) != len(namesSet):
	print(json.dumps({"isError": True, "message": "You did not use all of the names"}))
	sys.exit(-1)

finalSum = 0.0
for listy in finalList:
	letters = {}
	for a in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
		letters[a] = 65535
		for n in listy:
			if n.count(a) < letters[a]:
				letters[a] = n.count(a)
	summy = 0
	for a in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
		summy += letters[a]
	finalSum += summy

print(json.dumps({"isError": False, "score": int(finalSum), "message": "You got a score of " + str(int(finalSum)) + "!"}))