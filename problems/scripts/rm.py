import sys
import math

for arg in sys.argv:
	filename = arg

input = open('../problems/input/rm.txt', 'r')
names = []
for line in input:
	names.append(line)

namesSet = set(names)


finalList = []
alreadyUsed = []

with open(filename) as fileIn:
	listy = []
	for line in fileIn:
		for w in line.split(' '):
			if w in namesSet and not w in alreadyUsed:
				listy.append(w)
				alreadyUsed.append(w)
			else:
				print('ERROR')
				sys.exit(-1)
	finalList.append(listy)


beenTo = []
for a in range(0, 500):
	beenTo.append(False)


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
	finalSum += len(listy) * len(listy) * summy

for a in beenTo:
	if not(a):
		print('Error')
		sys.exit(-1)

print(finalSum)



